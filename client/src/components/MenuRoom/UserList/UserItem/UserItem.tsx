import React, { FC } from 'react'
import { IUserOnline } from '../../../../types/IUser'

interface IUserItemProps {
   user: IUserOnline;
}

export const UserItem: FC<IUserItemProps> = ({user}) => {
  return (
    <div>
        <h1>{user.login}</h1>
        <h2>{user.isOnline ? 'Онлайн' : 'Офлайн'}</h2>
    </div>
  )
}
