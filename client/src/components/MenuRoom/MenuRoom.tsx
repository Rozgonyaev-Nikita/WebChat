import { FC, useEffect, useState } from 'react'
import classes from './MenuRoom.module.css'
import getSocketClient from '../../socket';

interface IMenuRoomProps{
    // users: string[];
    nameRoom: string;
    type: 'private' | 'group';
    users: string[];
    roomId: string;
    myUser: string;
}

export const MenuRoom: FC<IMenuRoomProps> = ({nameRoom, type, users, roomId, myUser}) => {
  const [friend2, setfriend2] = useState<string[]>([])
  const client = getSocketClient()
  useEffect(() => {
    client.emit('users_online', {roomId, usersInRoom: users})
    console.log('отправка')
  }, [])
  useEffect(() => {
    console.log('привет')
    client.on('user_online', (friend) => {
      console.log('karp')
      console.log('user_online', friend)
      setfriend2(friend)
    })
    return () => {
      client.off('user_online')
    } 
  }, [client])

  // const isOnline = users.find(u => u === friend2)
  const nameOther = friend2.find(f => f !== myUser)
  // console.log('friend2', friend2)
  // console.log('isOnline', isOnline)

  return (
    <div className={classes.menuRoom}>
        <h2>{nameRoom}</h2>
        {type === "private" && nameOther && 'Онлайн'}
    </div>
  )
}
