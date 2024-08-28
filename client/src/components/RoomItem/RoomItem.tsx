import React, { FC } from 'react'
import { IRoom } from '../../types/IRoom'
import classes from './RoomItem.module.css'
import { Link } from 'react-router-dom';
import { getNameRoom } from '../../utils';
import { useGetUserQuery } from '../../store/userApi';
import { Avatar, ESize } from '../../UI/Avatar/Avatar';
import { useAppSelector } from '../../hooks/reduxHooks';

interface IRoomItemsProps {
    item: IRoom;
    user: {login: string, avatar: string};
}

export const RoomItem:FC<IRoomItemsProps> = ({item, user}) => {
  console.log('user', user)

  const {data: otherUser} = useGetUserQuery(getNameRoom(item, user.login));

  const isOnline = useAppSelector(state => 
    otherUser && state.usersOnline.usersOnline.some(u => u === otherUser._id)
  );

  return (
    <Link to={`/room/${item._id}`}>
    <div className={classes.room}>
      <div className={classes.avatarWrapper}>
        {isOnline && <div className={classes.isOnline}></div>}
       <Avatar avatar={otherUser?.avatar} size={ESize.MEDIUM}/>
       </div>
       <div className={classes.info}>
        <h1 className={classes.name}>{getNameRoom(item, user.login)}</h1>
        {item.lastMessage && (
  <p>
    {item.lastMessage.author.login !== user.login ? (
      item.lastMessage.author.login
    ) : (
      <Avatar avatar={user.avatar} size={ESize.MICRO} className={classes.avatar}/>
    )}
    {item.lastMessage.text}
  </p>
)}

        </div>
    </div>
    </Link>
  )
}
