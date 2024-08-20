import React, { FC, useState } from 'react'
import getSocketClient from '../../../socket'
import { useAppSelector } from '../../../hooks/reduxHooks';
import classes from './MenuPrivateRoom.module.css'
import { IUser } from '../../../types/IUser';

interface IMenuPrivateRoomProps{
    nameRoom: string;
    users: IUser[];
    myUser: string;
}

export const MenuPrivateRoom: FC<IMenuPrivateRoomProps> = ({nameRoom, users, myUser}) => {

  const nameOther = users.find(f => f._id !== myUser);

  console.log('nameOther', nameOther)
  const isOnline = useAppSelector(state => 
    state.usersOnline.usersOnline.some(u => u === nameOther._id)
  );

  console.log('isOnline', isOnline)

  return (
    <div className={classes.menuRoom}>
        <h2>{nameRoom}</h2>
        {isOnline && 'Онлайн'}
        {/* {type === 'group' && <h5>{`Количество участников ${users.length}`}</h5>} */}
    </div>
  )
}
