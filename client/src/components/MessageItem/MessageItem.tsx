import React, { FC } from 'react'
import {IMessage} from '../../types/IRoom'
import classes from './MessageItem.module.css'

interface IMessageItemProps {
    message: IMessage,
    whose: 'my' | 'alien',
}

export const MessageItem: FC<IMessageItemProps> = ({message, whose}) => {
  return (
    <div className={whose === 'my' ? classes.myMessage : classes.alienMessage}>
        {message.text}
    </div>
  )
}
