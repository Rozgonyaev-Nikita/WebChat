import React, { FC } from 'react'
import {IMessage} from '../../types/IRoom'
import classes from './MessageItem.module.css'

interface IMessageItemProps {
    message: IMessage,
    whose: 'my' | 'alien',
}

export const MessageItem: FC<IMessageItemProps> = ({message, whose}) => {
  const formattedDate = new Date(message.date).toLocaleString();

  if(whose === 'my'){
    return (
      <div className={classes.messageMyWrapper}>
    <div className={`${classes.message} ${classes.mine}`}>
        <h1>{message.text}</h1>
        <h6>{formattedDate}</h6>
    </div>
    </div>
    )
  }
  
  return (
    <div className={classes.messageAlienWrapper}>
      <div className={`${classes.message} ${classes.alien}`}>
        <h1>{message.text}</h1>
        <h6>{formattedDate}</h6>
    </div>
    </div>
    
  )
}
