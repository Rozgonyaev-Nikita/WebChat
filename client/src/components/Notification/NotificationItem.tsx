import React, { FC } from 'react'
import { INotification } from '../../types/IUser'
import classes from './Notification.module.css'
import { Avatar, ESize } from '../../UI/Avatar/Avatar'

interface INotificationProps {
  notification: INotification
}

export const NotificationItem: FC<INotificationProps> = ({ notification }) => {
  const renderNotificationContent = () => {
    switch (notification.type) {
      case 'addFriend':
        return (
          <>
            <Avatar avatar={notification.from.avatar} size={ESize.MIN} className={classes.avatar} />
            <div className={classes.content}>
              <span className={classes.name}>{notification.from.login}</span>
              <span className={classes.text}> хочет добавить вас в друзья</span>
            </div>
          </>
        )
      // Добавьте другие типы уведомлений по аналогии
      default:
        return null
    }
  }

  return (
    <div className={classes.notification}>
      {renderNotificationContent()}
    </div>
  )
}