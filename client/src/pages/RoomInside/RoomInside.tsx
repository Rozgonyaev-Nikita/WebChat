import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddMessageinRoomMutation, useGetRoomApiByUserQuery } from '../../store/roomApi';
import { useAppSelector } from '../../hooks/reduxHooks';
import List from '../../components/List/List';
import { MessageItem } from '../../components/MessageItem/MessageItem';

export const RoomInside = () => {
  const [message, setMessage] = useState('');

  const user = useAppSelector(u => u.auth.user._id)
  const {data} = useGetRoomApiByUserQuery(user);
  
  console.log('data', data)
  const [addMessage, {isError}] = useAddMessageinRoomMutation();

  const navigate = useNavigate()
  const {roomName} = useParams();

  if(data === undefined){
    navigate('/')
    return;
  }

  const currentRoom = data.find(d => d._id === roomName);

  const countComment = data.find(d => d._id === roomName).messages.length;

  const handlerAddMessage = async() => {
    await addMessage({ roomId: roomName, authorName: user, text: message }).unwrap();
    setMessage('')
  }

  return (
    <div>
        <h1>{roomName}</h1>
        <h2>{countComment}</h2>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handlerAddMessage}>Отправить</button>
        <List items={currentRoom.messages} renderItem={(message) => { return message.authorName === user ? <MessageItem whose='my' message={message} /> : <MessageItem whose='alien' message={message} />}}/>
    </div>
  )
}
