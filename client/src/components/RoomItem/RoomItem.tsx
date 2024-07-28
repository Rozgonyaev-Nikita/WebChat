import React, { FC } from 'react'
import { IRoom } from '../../types/IRoom'
import classes from './RoomItem.module.css'
import { Link } from 'react-router-dom';

interface IRoomItemsProps {
    item: IRoom;
}

export const RoomItem:FC<IRoomItemsProps> = ({item}) => {
  // if(item.messages.length === 0){
  //   console.log('Пусто');
  //   return;
  // }
  return (
    <Link to={`/room/${item._id}`}>
    <div className={classes.room}>
        <h1>{item.nameRoom}</h1>
        {item.lastMessage &&<p>{item.lastMessage.text}</p>}
    </div>
    </Link>
  )
}
