import React, { useEffect, useState } from 'react'
import List from '../../components/List/List'
import { RoomItem } from '../../components/RoomItem/RoomItem'
import { IRoom } from '../../types/IRoom'
import client from '../../socket'
import axios from 'axios'
import { useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { useAddRoomMutation, useGetRoomApiByUserQuery } from '../../store/roomApi'

export const Chat = () => {
  const [rooms, setRooms] = useState<IRoom[]>([])
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [data2, setData2] = useState({message: '', room: ''})
  const [update, setUpdate] = useState<any>('')

  const user = useAppSelector(u => u.auth.user._id)
  const { data, isLoading} = useGetRoomApiByUserQuery(user);
  const [addRoom, {isError}] = useAddRoomMutation();
  const navigate = useNavigate();

  
  const connectRoom = async() => {
    client.emit('create', room)
    // axios.post('http://localhost:5000/api/addRoom', {type: 'group', nameRoom: room, userId: user}).then(res => setRooms(prev => [...prev, res.data]))// обновить список, обновить data
    await addRoom({type: 'group', nameRoom: room, userId: user})
   }

  //  const sendMessage = () => {
  //   client.emit('sendEveryoneMessage', {message, room})
  //  }

   useEffect(() => {
    client.on('mess', (data) => {
      setData2(data)
    })
   }, [rooms])

   useEffect(() => {
    const {message, room } = data2;
    const isRoom = rooms.findIndex(r => r['_id'].toString() === room);
    if (isRoom !== -1) {
      // const cazan =  [...rooms, rooms[isRoom]: { ...rooms[isRoom], rooms[isRoom].messages: [...rooms[isRoom].messages, { text: message}] }]
      const cazan = rooms.map((room) => {
        if (room._id === rooms[isRoom]._id) {
            return {
                ...room,
                messages: [...room.messages, { text: message }]
            };
        }});
      setRooms([...cazan]);
    } else if(data2.room === '') {
      return;
    } else {
      console.log('такого нет')
      // setRooms(prev => [...prev, { id: room, messages: [message] }]);
    }
   }, [data2])
   useEffect(() => {
    
    if(!user){
      console.log('Пользователь не авторизирован')
      navigate('/avtorization');
    } else{
      // console.log('userr', user)
      // @ts-ignore
    //  axios.get<IRoom[]>('http://localhost:5000/api/getAllrooms', { params: {user} })
    //   .then(res => setRooms(res.data))
    }
   }, [user])

   

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
