import React, { FC, useState } from 'react'
import getSocketClient from '../../../socket'
import { useAppSelector } from '../../../hooks/reduxHooks';
import classes from './MenuPrivateRoom.module.css'
import { IUser } from '../../../types/IUser';
import { Avatar, ESize } from '../../../UI/Avatar/Avatar';

interface IMenuPrivateRoomProps{
    nameRoom: string;
    users: IUser[];
    myUser: string;
}

export const MenuPrivateRoom: FC<IMenuPrivateRoomProps> = ({nameRoom, users, myUser}) => {

  const userOther = users.find(f => f._id !== myUser);

  console.log('userOther', userOther)
  const isOnline = useAppSelector(state => 
    state.usersOnline.usersOnline.some(u => u === userOther._id)
  );

  console.log('isOnline', isOnline)

  return (
    <div className={classes.menuRoom}>
      {userOther.avatar && <Avatar avatar={userOther.avatar} size={ESize.MIN}/>}
      <div>
      <h2>{nameRoom}</h2>
      {isOnline && 'Онлайн'}
      </div>
        
    </div>
  )
}
