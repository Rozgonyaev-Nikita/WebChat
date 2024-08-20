import React, { FC } from 'react'
import { IRoom } from '../../types/IRoom'
import classes from './RoomItem.module.css'
import { Link } from 'react-router-dom';
import { getNameRoom } from '../../utils';

interface IRoomItemsProps {
    item: IRoom;
    userId: string;
}

export const RoomItem:FC<IRoomItemsProps> = ({item, userId}) => {
  return (
    <Link to={`/room/${item._id}`}>
    <div className={classes.room}>
        <h1>{getNameRoom(item, userId)}</h1>
        {item.lastMessage &&<p>{item.lastMessage.text}</p>}
    </div>
    </Link>
  )
}
