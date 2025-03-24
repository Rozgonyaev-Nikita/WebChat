
import React from 'react'
import { useSelector } from 'react-redux'
import { useAppSelector } from '../../hooks/reduxHooks'
import List from '../List/List'
import { notification } from 'antd'
import { NotificationItem } from './NotificationItem'
import classes from './Notification.module.css'

type Props = {}

export const Notifications = (props: Props) => {

  const notifications = useAppSelector(state => state.auth.user.notifications)

  return (
    <div className={classes.wrapper}>
        <List items={notifications} renderItem={(notification, key) => <NotificationItem notification={notification}/>}/>
    </div>
  )
}