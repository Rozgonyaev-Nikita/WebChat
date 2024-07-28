import React, { FC } from 'react'
import {IMessage} from '../../types/IRoom'
import classes from './MessageItem.module.css'

interface IMessageItemProps {
    message: IMessage,
    whose: 'my' | 'alien',
}

export const MessageItem: FC<IMessageItemProps> = ({message, whose}) => {
  console.log(message.date)
  const formattedDate = new Date(message.date).toLocaleString();
  
  return (
    <div className={whose === 'my' ? classes.myMessage : classes.alienMessage}>
        <h1>{message.text}</h1>
        <h6>{formattedDate}</h6>
    </div>
  )
}
