import { FC, useEffect, useState } from 'react'
import classes from './MenuRoom.module.css'
import getSocketClient from '../../socket';
import { useAppSelector } from '../../hooks/reduxHooks';

interface IMenuRoomProps{
    // users: string[];
    nameRoom: string;
    type: 'private' | 'group';
    users: string[];
    roomId: string;
    myUser: string;
}

export const MenuRoom: FC<IMenuRoomProps> = ({nameRoom, type, users, roomId, myUser}) => {
  const client = getSocketClient()
  const [friend2, setfriend2] = useState<string[]>([])

  const nameOther = users.find(f => f !== myUser)
  console.log('nameOther', nameOther)
  const isOnline = useAppSelector(state => 
    state.usersOnline.usersOnline.some(u => u === nameOther)
  );
  console.log('isOnline', isOnline)


  return (
    <div className={classes.menuRoom}>
        <h2>{nameRoom}</h2>
        {type === "private" && isOnline && 'Онлайн'}
        {type === 'group' && <h5>{`Количество участников ${users.length}`}</h5>}
    </div>
  )
}
