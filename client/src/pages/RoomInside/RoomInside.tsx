import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddMessageinRoomMutation, useGetRoomApiByUserQuery } from '../../store/roomApi';
import { useAppSelector } from '../../hooks/reduxHooks';
import List from '../../components/List/List';
import { MessageItem } from '../../components/MessageItem/MessageItem';
import client from '../../socket';
import { IMessage } from '../../types/IRoom';

export const RoomInside = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const user = useAppSelector(u => u.auth.user._id);
  const {data} = useGetRoomApiByUserQuery(user);
  
  const [addMessage, {isError}] = useAddMessageinRoomMutation();

  const navigate = useNavigate()
  const {roomName} = useParams();

  useEffect(() => {
    data && setMessages(data.find(d => d._id === roomName).messages)
  }, [data])

  useEffect(() => {
    client.on('chatMessage', (data) => {
      console.log('mes', data)
      setMessages(prev => [...prev, data])
    })
  }, [client])

  if(data === undefined){
    navigate('/')
    return;
  }

  // let currentRoom = data.find(d => d._id === roomName).messages;

  const countComment = data?.find(d => d._id === roomName)?.messages?.length ?? 0;


  const handlerAddMessage = async() => {
    const newMessage = { roomId: roomName, authorName: user, text: message };
    await addMessage(newMessage).unwrap();
    client.emit('sendEveryoneMessage', newMessage)
    setMessage('')
  } 

  return (
    <div>
        <h1>{roomName}</h1>
        <h2>{countComment}</h2>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handlerAddMessage}>Отправить</button>
        <List items={messages} renderItem={(message, key) => { 
          key = message._id !== undefined ? message._id.toString() : key;
          return message.authorName === user ? <MessageItem whose='my' message={message} key={key} /> : <MessageItem whose='alien' message={message} key={key}/>
          }}/>
    </div>
  )
}
