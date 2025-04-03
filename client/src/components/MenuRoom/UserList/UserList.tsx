import React, { FC, useEffect, useMemo } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { IUser, IUserOnline } from '../../../types/IUser'
import { Avatar, List, Typography, Tag, Card, Divider } from 'antd'
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'
import classes from './UserList.module.css'

const { Text } = Typography

interface IUserListProps {
  users: IUser[]
}

export const UserList: FC<IUserListProps> = ({ users }) => {
  const usersOnline = useAppSelector(state => state.usersOnline.usersOnline)

  const userOnline: IUserOnline[] = useMemo(() => {
    return users.map(user => ({
      ...user,
      isOnline: usersOnline.includes(user._id)
    }))
  }, [usersOnline, users])

  return (
    <Card 
      title="Участники" 
      bordered={false}
      className={classes.userListCard}
    >
      <Divider className={classes.divider} />
      <List
        dataSource={userOnline}
        renderItem={(user) => (
          <List.Item className={classes.userListItem}>
            <List.Item.Meta
              avatar={
                <Avatar 
                  src={user.avatar} 
                  icon={<UserOutlined />}
                  size="large"
                  className={user.isOnline ? classes.avatarOnline : classes.avatarOffline}
                />
              }
              title={
                <div className={classes.userTitle}>
                  <Text strong>{user.login}</Text>
                  <Tag 
                    icon={user.isOnline ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                    color={user.isOnline ? 'success' : 'default'}
                    className={classes.statusTag}
                  >
                    {user.isOnline ? 'В сети' : 'Не в сети'}
                  </Tag>
                </div>
              }
              description={'Участник группы'}
            />
          </List.Item>
        )}
      />
    </Card>
  )
}
