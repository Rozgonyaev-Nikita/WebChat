import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddMessageinRoomMutation, useGetRoomApiByUserQuery } from '../../store/roomApi';
import { useAppSelector } from '../../hooks/reduxHooks';
import List from '../../components/List/List';
import { MessageItem } from '../../components/MessageItem/MessageItem';
import { IMessage } from '../../types/IRoom';
import getSocketClient from '../../socket';
import { getNameRoom } from '../../utils';
import { MenuPrivateRoom } from '../../components/MenuRoom/MenuPrivateRoom/MenuPrivateRoom';
import { MenuGroupRoom } from '../../components/MenuRoom/MenuGroupRoom/MenuGroupRoom';
import classes from './RoomInside.module.css'

export const RoomInside = () => {
  const chatElement = useRef<HTMLDivElement>(null);

  const client = getSocketClient();
  const { roomName } = useParams();

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { _id, login } = useAppSelector(u => u.auth.user);
  const { room, refetch } = useGetRoomApiByUserQuery(_id, {
    selectFromResult: ({ data }) => ({
      room: data?.find((post) => post._id === roomName),
    }),
  })

  const [addMessage, { isError }] = useAddMessageinRoomMutation();

  const navigate = useNavigate()
  const scroll = () => {
    if(chatElement.current){
      chatElement.current.scrollTop = chatElement.current.scrollHeight;
    console.log(chatElement.current.scrollHeight)
    console.log(chatElement.current.scrollTop)
    // console.log('chat', chatElement.current)
    console.log("karp")
    }
  }
  useEffect(() => {
    if (client) {
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
      }
    }
  }, [client])

  useEffect(() => {
    if(chatElement.current){
      chatElement.current.scrollTop = chatElement.current.scrollHeight;
    console.log(chatElement.current.scrollHeight)
    console.log(chatElement.current.scrollTop)
    // console.log('chat', chatElement.current)
    console.log("cazan")
    }
  }, [room?.messages]); // Это зависит от вашего списка сообщений

  if (room === undefined) {
    navigate('/')
    return;
  }

  

  const handlerAddMessage = async () => {
    if (message !== '') {
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
    <div className={classes.wrapper} onClick={scroll}>
      {room.type === 'private' ? <MenuPrivateRoom myUser={_id} users={room.users} nameRoom={getNameRoom(room, login)} /> : <MenuGroupRoom myUser={_id} users={room.users} nameRoom={getNameRoom(room, login)} />}
      <div className={classes.wrapperList} ref={chatElement}>
      <List className={classes.list} items={room.messages} renderItem={(message, key) => {
        key = message._id !== undefined ? message._id.toString() : key;
        return <MessageItem whose={ message.author.login === login ? 'my' : 'alien'} message={message} key={key}/>
      }} />
      </div>
      <div className={classes.send} >
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handlerAddMessage}>Отправить</button>
      </div>
      
    </div>
  )
}
