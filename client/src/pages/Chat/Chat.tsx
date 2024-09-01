import { useEffect, useState } from 'react'
import List from '../../components/List/List'
import { RoomItem } from '../../components/RoomItem/RoomItem'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { useAddGroupRoomMutation, useAddMessageinRoomMutation, useGetRoomApiByUserQuery } from '../../store/roomApi'
import getSocketClient from '../../socket'
import classes from './Chat.module.css'
import { PrivateRoomItem } from '../../components/RoomItem/PrivateRoomItem'
import { GroupRoomItem } from '../../components/RoomItem/GroupRoomItem'
import { MenuChat } from '../../components/MenuChat/MenuChat'

export const Chat = () => {
  const client = getSocketClient()
  const [nameRoom, setNameRoom] = useState('')

  const { _id, login, avatar } = useAppSelector(u => u.auth.user);
  const { data, isLoading, refetch } = useGetRoomApiByUserQuery(_id);
  const [addRoom, { isError }] = useAddGroupRoomMutation();
  const [addMessage] = useAddMessageinRoomMutation();
  const navigate = useNavigate();

  const connectRoom = async () => {
    const resultRoom = await addRoom({ type: 'group', nameRoom, userId: _id })
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
      client.on('refreshRoomClients', (id) => {//refreshRoomClient
        try {
          console.log('обновление чата')
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


console.log('data', data)
  return (
    
    <div className={classes.chat}>
      <MenuChat/>
      <input type="text" value={nameRoom} onChange={e => setNameRoom(e.target.value)} />
      <button onClick={connectRoom}>Присоединиться</button>
      <br />
      <List items={data} renderItem={(room) => {
          return room.type === 'private' ? <PrivateRoomItem item={room} user={{login, avatar}} key={room._id} /> : <GroupRoomItem item={room} user={{login, avatar}} key={room._id}/>}} 
          condition={Boolean(data?.length > 0)} inThisCase={<h2>У вас пока еще нет ни одного чата!</h2>}/>
    </div>
  )
}
