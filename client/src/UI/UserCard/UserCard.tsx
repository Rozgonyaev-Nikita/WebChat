import React, { FC } from 'react'
import { IUser } from '../../types/IRoom'
import classes from './UserCard.module.css'
import axios from 'axios';
import { usePatchFriendsMutation } from '../../store/userApi';

interface IUserCard {
    myUser?: string;
    user: IUser;
    isAddFriend: boolean;
}

export const UserCard: FC<IUserCard> = ({myUser, user, isAddFriend}) => {
  const [addFriend] = usePatchFriendsMutation()

  const addnewFriend = async() => {
    try {
      await addFriend({myId: myUser, friendId: user._id, action: 'sendInvitation'}).unwrap();
      console.log('успех')
    } catch (error) {
      console.log('ошибка', error)
    }
    
   
  }

  return (
    <div className={classes.card}>
        <h1>{user.login}</h1>
        {isAddFriend && <button onClick={addnewFriend}>Добавить</button>}
    </div>
  )
}
