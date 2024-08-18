import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddMessageinRoomMutation, useGetRoomApiByUserQuery } from '../../store/roomApi';
import { useAppSelector } from '../../hooks/reduxHooks';
import List from '../../components/List/List';
import { MessageItem } from '../../components/MessageItem/MessageItem';
// import client from '../../socket';
import { IMessage } from '../../types/IRoom';
import getSocketClient from '../../socket';
import { MenuRoom } from '../../components/MenuRoom/MenuRoom';
import { getNameRoom } from '../../utils';

export const RoomInside = () => {
  const client = getSocketClient();
  const {roomName} = useParams();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const {_id, login} = useAppSelector(u => u.auth.user);
  const { room } = useGetRoomApiByUserQuery(_id, {
    selectFromResult: ({ data }) => ({
      room: data?.find((post) => post._id === roomName),
    }),
  })
  console.log('rm', room)
  
  const [addMessage, {isError}] = useAddMessageinRoomMutation();

  const navigate = useNavigate()
  

  // useEffect(() => {
  //   room && setMessages(room.messages)
  // }, [room])

  useEffect(() => {
    if(client){
    client.on('chatMessage', (data) => {
      console.log('mes', data)
      setMessages(prev => [...prev, data])
    })
    // client.on('user_online', (friend) => {
    //   console.log('friend', friend)
    //   setMessages(prev => [...prev, data])
    // })
    return () => {
      client.off('chatMessage')
    } }
  }, [client])

  if(room === undefined){
    navigate('/')
    return;
  }


  const handlerAddMessage = async() => {
    if(message !== '') {
    const newMessage = { roomId: roomName, authorName: _id, text: message };
    await addMessage(newMessage).unwrap();
    console.log('отправка')
    client.emit('sendEveryoneMessage', newMessage)
    setMessage('')
    }
  } 
  return (
    <div>
        <MenuRoom type={room.type} roomId ={room._id} myUser={_id} users={room.users} nameRoom={getNameRoom(room, login)}/>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handlerAddMessage}>Отправить</button>
        <List items={room.messages} renderItem={(message, key) => { 
          key = message._id !== undefined ? message._id.toString() : key;
          return message.authorName === _id ? <MessageItem whose='my' message={message} key={key} /> : <MessageItem whose='alien' message={message} key={key}/>
          }}/>
    </div>
  )
}
