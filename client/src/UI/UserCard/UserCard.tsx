import React, { FC } from 'react'
import { IUser } from '../../types/IRoom'
import classes from './UserCard.module.css'
import axios from 'axios';
import { usePatchFriendsMutation } from '../../store/userApi';
import client from '../../socket';

interface IUserCard {
    myUser?: string;
    user: IUser;
    type?: 'basic' | 'addFriend' | 'wait';
}

export const UserCard: FC<IUserCard> = ({myUser, user, type = 'basic'}) => {
  const [actionFriend] = usePatchFriendsMutation()

  // console.log('user', user)
  const addnewFriend = async() => {
    try {
      await actionFriend({myId: myUser, friendId: user._id, action: 'sendInvitation'}).unwrap();
      console.log('успех')
    } catch (error) {
      console.log('ошибка', error)
    } 
  }

  const acceptOffer = async() => {
    try {
      await actionFriend({myId: myUser, friendId: user._id, action: 'acceptOffer'}).unwrap();
      client.emit('refreshFriends')
      console.log('успех')
    } catch (error) {
      console.log('ошибка', error)
    } 
  } 

  const whichButton = () => {
    if(type === 'basic') {
      return '';
    } else if(type === 'addFriend') {
      return <button onClick={addnewFriend}>Добавить</button>
    } else if(type === 'wait') {
      return <button onClick={acceptOffer}>Принять</button>
    }
    
  }

  const waitFriend = user.friends.wait.includes(myUser)

  return (
    <div className={classes.card}>
        <h1>{user.login}</h1>
        {waitFriend && <h3>Заявка отправлена</h3>}
        {whichButton()}
    </div>
  )
}
