import React, { FC } from 'react'
import { IMessage } from '../../types/IRoom';
import classes from './RoomItem.module.css'
import { Avatar, ESize } from '../../UI/Avatar/Avatar';

interface ILastMessageProps {
    message: IMessage;
    user: { login: string, avatar: string };
}

export const LastMessage: FC<ILastMessageProps> = ({ message, user }) => {

    if (message === null) {
        return <p>Сообщений нет!</p>; // или return undefined;
    }

    return (
        <p>
            {message.author.login !== user.login ? (
                <span style={{ color: 'red' }}>{message.author.login}  </span>
            ) : (
                <Avatar avatar={user.avatar} size={ESize.MICRO} className={classes.avatar} />
            )}
            {message.text ? <span className={classes.text}>{message.text} {!message.read && "новое"}</span> : 'Сообщений нет!'}
        </p>
    )
}
// сделать строке стили
// width: 400px; /* Установите нужную ширину */
//     white-space: nowrap; /* Отключить перенос текста */
//     overflow: hidden; /* Скрыть переполнение */
//     text-overflow: ellipsis; 