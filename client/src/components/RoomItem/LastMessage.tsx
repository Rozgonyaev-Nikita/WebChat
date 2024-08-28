import React, { FC } from 'react'
import { IMessage } from '../../types/IRoom';
import classes from './RoomItem.module.css'
import { Avatar, ESize } from '../../UI/Avatar/Avatar';

interface ILastMessageProps{
    message: IMessage;
    user: { login: string, avatar: string };
}

export const LastMessage: FC<ILastMessageProps> = ({message, user}) => {

    if (message === null) {
        return <p>Сообщений нет!</p>; // или return undefined;
    }

  return (
    <p>
        {message.author.login !== user.login ? (
            message.author.login
        ) : (
            <Avatar avatar={user.avatar} size={ESize.MICRO} className={classes.avatar} />
        )}
        {message.text ? message.text : 'Сообщений нет!'}
    </p>
  )
}
// сделать строке стили