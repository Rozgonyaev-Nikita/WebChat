import React, { useEffect, useState } from 'react'
import List from '../../components/List/List'
import { RoomItem } from '../../components/RoomItem/RoomItem'
import { IRoom } from '../../types/IRoom'
import client from '../../socket'
import axios from 'axios'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { useAddMessageinRoomMutation, useAddRoomMutation, useGetRoomApiByUserQuery } from '../../store/roomApi'

export const Chat = () => {
  const [rooms, setRooms] = useState<IRoom[]>([])
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [data2, setData2] = useState({message: '', room: ''})
  const [update, setUpdate] = useState<any>('')

  const user = useAppSelector(u => u.auth.user._id)
  const { data, isLoading} = useGetRoomApiByUserQuery(user);
  const [addRoom, {isError}] = useAddRoomMutation();
  const [addMessage] = useAddMessageinRoomMutation();
  const navigate = useNavigate();

  
  const connectRoom = async() => {
    // axios.post('http://localhost:5000/api/addRoom', {type: 'group', nameRoom: room, userId: user}).then(res => setRooms(prev => [...prev, res.data]))// обновить список, обновить data
    await addRoom({type: 'group', nameRoom: room, userId: user})
    client.emit('create', room)
   }

  
   useEffect(() => {
    
    if(!user){
      console.log('Пользователь не авторизирован')
      navigate('/avtorization');
    }
   }, [user])

   useEffect(() => {
client.on('chatMessage', async(data) => {
  await addMessage(data)
}) 
   }, [])

   

  return (
    <div>
      <input type="text" value={room} onChange={e => setRoom(e.target.value)}/>
      <button onClick={connectRoom}>Присоединиться</button>
       <br/>
      {/* <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Отправить</button> */}
      {data !== undefined && <List items={data} renderItem={(room) => <RoomItem item={room} key={room['_id'].toString()}/>}/>}
    </div>
  )
}
