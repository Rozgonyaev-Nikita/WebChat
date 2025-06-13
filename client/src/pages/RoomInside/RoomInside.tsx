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
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

export const RoomInside = () => {
  const chatElement = useRef<HTMLDivElement>(null);
  const client = getSocketClient();
  const { roomName } = useParams();
  const [message, setMessage] = useState('');
  const [, setMessages] = useState<IMessage[]>([]);
  const { _id, login } = useAppSelector(u => u.auth.user);
  const [readMessage] = usePatchReadMessageMutation();
  const { TextArea } = Input;

  const { room, refetch } = useGetRoomApiByUserQuery(_id, {
    selectFromResult: ({ data }) => ({
      room: data?.find((post) => post._id === roomName),
    }),
  })

  const isOnline = useAppSelector(state => {
    const usersOnline = state.usersOnline.usersOnline;
    console.log('onl', usersOnline)
    return state.usersOnline.usersOnline.some(u => u !== _id)
  });

  const sortRoom: IRoom = useMemo(() => {
    console.log('yes')
    if (room) {
        return {
            ...room,
            messages: room.messages.map(message => {
                if (message.author.login !== login || isOnline) {
                    return {
                        ...message,
                        read: true 
                    };
                }
                return message;
            })
        };
    }
    return {} as IRoom;
  }, [room, login, isOnline]);

  const [addMessage] = useAddMessageinRoomMutation();
  const navigate = useNavigate();

  const scroll = () => {
    if(chatElement.current){
      chatElement.current.scrollTop = chatElement.current.scrollHeight;
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
    }
  }, [room?.messages]);

  useEffect(() => {
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
    return null;
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlerAddMessage();
    }
  };

  return (
    <div className={classes.wrapper} onClick={scroll}>
      {room.type === 'private' ? 
        <MenuPrivateRoom myUser={_id} users={room.users} nameRoom={getNameRoom(room, login)} /> : 
        <MenuGroupRoom myUser={_id} users={room.users} nameRoom={getNameRoom(room, login)} />
      }
      <div className={classes.wrapperList} ref={chatElement}>
        {sortRoom?.messages && sortRoom?.messages.length ? 
          <List 
            className={classes.list} 
            items={sortRoom.messages} 
            renderItem={(message, key) => {
              key = message._id !== undefined ? message._id.toString() : key;
              return <MessageItem 
                whose={message.author.login === login ? 'my' : 'alien'} 
                message={message} 
                key={key}
              />
            }} 
          />
          : <h1 className={classes.messageNone}>Сообщений нет!</h1>
      }
      </div>
      <div className={classes.sendContainer}>
        <div className={classes.inputWrapper}>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите сообщение..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            className={classes.messageInput}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handlerAddMessage}
            className={classes.sendButton}
            disabled={!message.trim()}
          />
        </div>
      </div>
    </div>
  )
}
