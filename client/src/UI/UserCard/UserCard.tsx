import React, { FC } from 'react'
import { IUser } from '../../types/IRoom'
import classes from './UserCard.module.css'
import axios from 'axios';

interface IUserCard {
    myUser?: string;
    user: IUser;
    isAddFriend: boolean;
}

export const UserCard: FC<IUserCard> = ({myUser, user, isAddFriend}) => {

  const addnewFriend = () => {
    axios.post('http://localhost:5000/api/friends/addNewFriend', {myId: myUser, friendId: user._id}).then(res => console.log(res.data))
  }

  return (
    <div className={classes.card}>
        <h1>{user.login}</h1>
        {isAddFriend && <button onClick={addnewFriend}>Добавить</button>}
    </div>
  )
}
