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
  const [rooms, setRooms] = useState<IRoom[]>([])
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [data2, setData2] = useState({ message: '', room: '' })
  const [update, setUpdate] = useState<any>('')

  const { _id, login } = useAppSelector(u => u.auth.user)
  const { data, isLoading, refetch } = useGetRoomApiByUserQuery(_id);
  const [addRoom, { isError }] = useAddGroupRoomMutation();
  const [addMessage, { data: dataRooms }] = useAddMessageinRoomMutation();
  const navigate = useNavigate();

console.log('client2', client)
  const connectRoom = async () => {
    // axios.post('http://localhost:5000/api/addRoom', {type: 'group', nameRoom: room, userId: _id}).then(res => setRooms(prev => [...prev, res.data]))// обновить список, обновить data
    const resultRoom = await addRoom({ type: 'group', nameRoom: room, userId: _id })
    console.log('resultRoom', resultRoom.data)
    client.emit('create', resultRoom.data._id)
  }


  useEffect(() => {

    if (!_id) {
      console.log('Пользователь не авторизирован')
      navigate('/avtorization');
    }
  }, [_id])

  useEffect(() => {
    
    if(client) {
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
      {/* <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Отправить</button> */}
      {data !== undefined && <List items={data} renderItem={(room) => <RoomItem item={room} userId={login} key={room['_id'].toString()} />} />}
    </div>
  )
}
