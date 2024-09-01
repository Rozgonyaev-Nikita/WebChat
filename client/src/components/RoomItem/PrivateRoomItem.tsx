import React, { FC } from 'react'
import classes from './RoomItem.module.css'
import { Link } from 'react-router-dom'
import { Avatar, ESize } from '../../UI/Avatar/Avatar'
import { getNameRoom } from '../../utils'
import { IRoom } from '../../types/IRoom';
import { useGetUserQuery } from '../../store/userApi';
import { useAppSelector } from '../../hooks/reduxHooks';
import { LastMessage } from './LastMessage'
import { MarkingOnine } from '../../UI/MarkingOnine/MarkingOnine'


interface IPrivateRoomItemsProps {
  item: IRoom;
  user: { login: string, avatar: string };
}

export const PrivateRoomItem: FC<IPrivateRoomItemsProps> = ({ item, user }) => {
  // console.log('private', user)

  const { data: otherUser } = useGetUserQuery(getNameRoom(item, user.login));

  const isOnline = useAppSelector(state =>
     otherUser && state.usersOnline.usersOnline.some(u => u === otherUser._id)
  );

  return (
    <Link to={`/room/${item._id}`}>
      <div className={classes.room}>
       <MarkingOnine isOnline={isOnline}>
          <Avatar avatar={otherUser?.avatar} size={ESize.MEDIUM}/>
       </MarkingOnine>
        <div className={classes.info}>
          <h1 className={classes.name}>{getNameRoom(item, user.login)}</h1>
          <LastMessage message={item.lastMessage} user={user} />
        </div>
      </div>
    </Link>
  )
}
