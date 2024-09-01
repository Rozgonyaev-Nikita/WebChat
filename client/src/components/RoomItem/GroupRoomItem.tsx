import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, ESize } from '../../UI/Avatar/Avatar'
import classes from './RoomItem.module.css'
import { IRoom } from '../../types/IRoom';
import { getNameRoom } from '../../utils';
import { LastMessage } from './LastMessage';

interface IGroupRoomItemsProps {
    item: IRoom;
    user: { login: string, avatar: string };
}

export const GroupRoomItem: FC<IGroupRoomItemsProps> = ({ item, user }) => {
    // console.log('group', user)
    let image;
    return (
        <Link to={`/room/${item._id}`}>
            <div className={classes.room}>
            <div className={classes.avatarWrapper}>
                <Avatar avatar={image} size={ESize.MEDIUM}/>
            </div>
                <div className={classes.info}>
                    <h1 className={classes.name}>{getNameRoom(item, user.login)}</h1>
                    <LastMessage message={item.lastMessage} user={user}/>
                </div>
            </div>
        </Link>
    )
}
