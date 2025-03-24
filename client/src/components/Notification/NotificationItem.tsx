import React, { FC } from 'react'
import { INotification } from '../../types/IUser'
import classes from './Notification.module.css'
import { Avatar } from '../../UI/Avatar/Avatar';

interface INotificationProps{
  notification: INotification;
}

export const NotificationItem: FC<INotificationProps> = ({notification}) => {
  console.log('type', notification.type)
  if(notification.type === 'addFriend') {
    return <div className={classes.notification}>
      <Avatar avatar={notification.from.avatar}/>
      <div className={classes.content}> 
        <span className={classes.name}>{notification.from.login}</span> хочет добавить вас в друзья</div>
    </div>
  }

  return (
    <div>Пусто</div>
  )
}