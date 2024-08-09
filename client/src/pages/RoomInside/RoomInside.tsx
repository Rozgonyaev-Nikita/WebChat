import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddMessageinRoomMutation, useGetRoomApiByUserQuery } from '../../store/roomApi';
import { useAppSelector } from '../../hooks/reduxHooks';
import List from '../../components/List/List';
import { MessageItem } from '../../components/MessageItem/MessageItem';
import client from '../../socket';
import { IMessage } from '../../types/IRoom';

export const RoomInside = () => {
  const {roomName} = useParams();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const user = useAppSelector(u => u.auth.user._id);
  const { room } = useGetRoomApiByUserQuery(user, {
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
    client.on('chatMessage', (data) => {
      console.log('mes', data)
      setMessages(prev => [...prev, data])
    })
    return () => {
      client.off('chatMessage')
    }
  }, [client])

  if(room === undefined){
    navigate('/')
    return;
  }


  const handlerAddMessage = async() => {
    const newMessage = { roomId: roomName, authorName: user, text: message };
    await addMessage(newMessage).unwrap();
    console.log('отправка')
    client.emit('sendEveryoneMessage', newMessage)
    setMessage('')
  } 

  return (
    <div>
        <h1>{roomName}</h1>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handlerAddMessage}>Отправить</button>
        <List items={room.messages} renderItem={(message, key) => { 
          key = message._id !== undefined ? message._id.toString() : key;
          return message.authorName === user ? <MessageItem whose='my' message={message} key={key} /> : <MessageItem whose='alien' message={message} key={key}/>
          }}/>
    </div>
  )
}
