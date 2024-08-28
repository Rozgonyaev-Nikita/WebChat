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
import { MenuPrivateRoom } from '../../components/MenuRoom/MenuPrivateRoom/MenuPrivateRoom';
import { MenuGroupRoom } from '../../components/MenuRoom/MenuGroupRoom/MenuGroupRoom';

export const RoomInside = () => {
  const client = getSocketClient();
  const {roomName} = useParams();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const {_id, login} = useAppSelector(u => u.auth.user);
  const { room, refetch } = useGetRoomApiByUserQuery(_id, {
    selectFromResult: ({ data }) => ({
      room: data?.find((post) => post._id === roomName),
    }),
  })
  
  const [addMessage, {isError}] = useAddMessageinRoomMutation();

  const navigate = useNavigate()

  useEffect(() => {
    if(client){
    client.on('chatMessage', (data) => {
      setMessages(prev => [...prev, data])
    })
    client.on('refreshGroupRoomClient', () => {
      try {
        refetch()
      } catch (error) {
        console.log(error)
      }
    })

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
    const newMessage = { roomId: roomName, author: _id, text: message };
    try {
      await addMessage(newMessage).unwrap();

    } catch (error) {
     console.log('error', error) 
    }
    client.emit('sendEveryoneMessage', newMessage)
    setMessage('')
    }
  } 
 
  return (
    <div>
        { room.type === 'private' ? <MenuPrivateRoom myUser={_id} users={room.users} nameRoom={getNameRoom(room, login)}/> : <MenuGroupRoom myUser={_id} users={room.users} nameRoom={getNameRoom(room, login)}/>}
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handlerAddMessage}>Отправить</button>
        <List items={room.messages} renderItem={(message, key) => { 
          key = message._id !== undefined ? message._id.toString() : key;
          return message.author.login === login ? <MessageItem whose='my' message={message} key={key} /> : <MessageItem whose='alien' message={message} key={key}/>
          }}/>
    </div>
  )
}
