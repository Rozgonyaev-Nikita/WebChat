import React, { useEffect, useState } from 'react'
import List from '../../components/List/List'
import { RoomItem } from '../../components/RoomItem/RoomItem'
import { IRoom } from '../../types/IRoom'
// import client from '../../socket'
import axios from 'axios'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { useAddGroupRoomMutation, useAddMessageinRoomMutation, useGetRoomApiByUserQuery } from '../../store/roomApi'
import getSocketClient from '../../socket'

export const Chat = () => {
  const client = getSocketClient()
  const [room, setRoom] = useState('')

  const { _id, login } = useAppSelector(u => u.auth.user)
  const { data, isLoading, refetch } = useGetRoomApiByUserQuery(_id);
  const [addRoom, { isError }] = useAddGroupRoomMutation();
  const [addMessage] = useAddMessageinRoomMutation();
  const navigate = useNavigate();

  const connectRoom = async () => {
    const resultRoom = await addRoom({ type: 'group', nameRoom: room, userId: _id })
    console.log('resultRoom', resultRoom.data)
    client.emit('create', resultRoom.data._id)
    client.emit('refreshGroupRoom', resultRoom.data._id)
  }

  useEffect(() => {

    if (!_id) {
      console.log('Пользователь не авторизирован')
      navigate('/avtorization');
    }
  }, [_id])

  useEffect(() => {

    if (client) {
      client.on('chatMessage', async (data) => {
        await addMessage(data)
      })
      client.on('refreshRoomClient', (id) => {
        try {
          client.emit('create', id)
          refetch();
        } catch (error) {
          console.log(error)
        }
      })
      return () => {
        // client.off('chatMessage');
        // client.off('refreshRoomClient');
      }
    }

  }, [])



  return (
    <div>
      <input type="text" value={room} onChange={e => setRoom(e.target.value)} />
      <button onClick={connectRoom}>Присоединиться</button>
      <br />
      {data && data.length > 0 ? (
        <List items={data} renderItem={(room) => <RoomItem item={room} userId={login} key={room['_id'].toString()} />} />
      ) : (
        <h2>У вас пока еще нет ни одного чата!</h2>
      )}
    </div>
  )
}
