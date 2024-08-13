import React, { FC } from 'react'
import { IRoom } from '../../types/IRoom'
import classes from './RoomItem.module.css'
import { Link } from 'react-router-dom';

interface IRoomItemsProps {
    item: IRoom;
    userId: string;
}

export const RoomItem:FC<IRoomItemsProps> = ({item, userId}) => {
  // if(item.messages.length === 0){
  //   console.log('Пусто');
  //   return;
  // }

  const getNameRoom = () => {
  if(item.type === 'private'){
    // const userNames = item.nameRoom.split(' ') as [string, string];
    const nameOther = item.nameRoom.replace(userId, '').trim();
    console.log('nameOther', nameOther);
    return nameOther;
  } else if(item.type === 'group'){
    return item.nameRoom;
  }
}

  return (
    <Link to={`/room/${item._id}`}>
    <div className={classes.room}>
        <h1>{getNameRoom()}</h1>
        {item.lastMessage &&<p>{item.lastMessage.text}</p>}
    </div>
    </Link>
  )
}
