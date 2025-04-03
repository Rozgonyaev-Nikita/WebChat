import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddMessageinRoomMutation, useGetRoomApiByUserQuery, usePatchReadMessageMutation } from '../../store/roomApi';
import { useAppSelector } from '../../hooks/reduxHooks';
import List from '../../components/List/List';
import { MessageItem } from '../../components/MessageItem/MessageItem';
import { IMessage, IRoom } from '../../types/IRoom';
import getSocketClient from '../../socket';
import { getNameRoom } from '../../utils';
import { MenuPrivateRoom } from '../../components/MenuRoom/MenuPrivateRoom/MenuPrivateRoom';
import { MenuGroupRoom } from '../../components/MenuRoom/MenuGroupRoom/MenuGroupRoom';
import classes from './RoomInside.module.css'


export const RoomInside = () => {
  const chatElement = useRef<HTMLDivElement>(null);

  const client = getSocketClient();
  const { roomName } = useParams();

  // let sortRoom: IRoom;
  

  const [message, setMessage] = useState('');
  const [, setMessages] = useState<IMessage[]>([]);
  const { _id, login } = useAppSelector(u => u.auth.user);

  const [readMessage] = usePatchReadMessageMutation();
  const { room, refetch } = useGetRoomApiByUserQuery(_id, {
    selectFromResult: ({ data }) => ({
      room: data?.find((post) => post._id === roomName),
    }),
  })

  const isOnline = useAppSelector(state => {
    const usersOnline = state.usersOnline.usersOnline;
    console.log('onl', usersOnline)
    // if(room?.type === 'private'){
      return state.usersOnline.usersOnline.some(u => u !== _id)
    // }
  }
  );
  

  const sortRoom: IRoom = useMemo(() => {
    console.log('yes')
    if (room) {
        return {
            ...room,
            messages: room.messages.map(message => {
                
                if (message.author.login !== login || isOnline) {
                    // Возвращаем новое сообщение с read: true
                    return {
                        ...message,
                        read: true 
                    };
                }
                
                return message;
            })
        };
    }
}, [room, login, isOnline]); // Добавьте login в зависимости, если он может изменяться

// console.log('room', room)
// console.log('sortRoom', sortRoom)
// console.log('isOnline', isOnline)

  const [addMessage] = useAddMessageinRoomMutation();

  const navigate = useNavigate()
  const scroll = () => {
    if(chatElement.current){
      chatElement.current.scrollTop = chatElement.current.scrollHeight;
    // console.log(chatElement.current.scrollHeight)
    // console.log(chatElement.current.scrollTop)
    // console.log('chat', chatElement.current)
    // console.log("karp")
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
    // console.log(chatElement.current.scrollHeight)
    // console.log(chatElement.current.scrollTop)
    // console.log('chat', chatElement.current)
    // console.log("cazan")
    }
  }, [room?.messages]); // Это зависит от вашего списка сообщений

  useEffect( () => {
    // if(room){
    // console.log('karp', {roomId: room._id, authorId: _id})
    // axios.patch('http://localhost:5000/api/room/markAsRead', {roomId: room._id, authorId: _id}).then(data => console.log('data3', data.data))
    // }
    const rdMsg = async() => {
      if(room){
        console.log('karp', {roomId: room._id, authorId: _id})
        await readMessage({roomId: room._id, authorId: _id}).unwrap();
      }
    }
    rdMsg()
  }, [])

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

  // console.log('sortRoom.messages', sortRoom?.messages)

  return (
    <div className={classes.wrapper} onClick={scroll}>
      {room.type === 'private' ? <MenuPrivateRoom myUser={_id} users={room.users} nameRoom={getNameRoom(room, login)} /> : <MenuGroupRoom myUser={_id} users={room.users} nameRoom={getNameRoom(room, login)} />}
      <div className={classes.wrapperList} ref={chatElement}>
      {sortRoom?.messages && <List className={classes.list} items={sortRoom.messages} renderItem={(message, key) => {
        key = message._id !== undefined ? message._id.toString() : key;
        return <MessageItem whose={ message.author.login === login ? 'my' : 'alien'} message={message} key={key}/>
      }} />}
      </div>
      <div className={classes.send} >
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={handlerAddMessage}>Отправить</button>
      </div>
      
    </div>
  )
}
