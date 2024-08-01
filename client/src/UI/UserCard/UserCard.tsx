import React, { FC } from 'react'
import { IUser } from '../../types/IRoom'
import classes from './UserCard.module.css'

interface IUserCard {
    user: IUser;
    isAddFriend: boolean;
}

export const UserCard: FC<IUserCard> = ({user, isAddFriend}) => {
  return (
    <div className={classes.card}>
        <h1>{user.login}</h1>
    </div>
  )
}
