import React, { FC } from 'react'
import {IMessage} from '../../types/IRoom'
import classes from './MessageItem.module.css'
import { IoCheckmarkDoneOutline, IoCheckmarkOutline  } from "react-icons/io5";

interface IMessageItemProps {
    message: IMessage,
    whose: 'my' | 'alien',
}

export const MessageItem: FC<IMessageItemProps> = ({message, whose}) => {
  const formattedDate = new Date(message.date).toLocaleString();

  
    return (
      <div className={whose === 'my' ? classes.messageMyWrapper : classes.messageAlienWrapper}>
    <div className={`${classes.message} ${whose === 'my' ?  classes.mine : classes.alien}`}>
        <h1 className={classes.text}>{message.text}</h1>
        {whose === 'my' ? (message.read ? <IoCheckmarkDoneOutline/> : <IoCheckmarkOutline/>) : ''}
        <h6 className={classes.date}>{formattedDate}</h6>
    </div>
    </div>
    )
}