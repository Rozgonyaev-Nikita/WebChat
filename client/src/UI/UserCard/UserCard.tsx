import React, { FC } from 'react'
import { IUser } from '../../types/IRoom'
import classes from './UserCard.module.css'
import { usePatchFriendsMutation } from '../../store/userApi';
import client from '../../socket';
import { useAddPrivateRoomMutation } from '../../store/roomApi';
import { useNavigate } from 'react-router-dom';

interface IUserCard {
    myUserId: string;
    user: IUser;
    type?: 'basic' | 'addFriend' | 'wait';
}

export const UserCard: FC<IUserCard> = ({myUserId, user, type = 'basic'}) => {
  const [actionFriend] = usePatchFriendsMutation();
  const [wtiteMessage2, {data}] = useAddPrivateRoomMutation();

  const navigate = useNavigate();

  // console.log('user', user)
  const addnewFriend = async() => {
    try {
      await actionFriend({myId: myUserId, friendId: user._id, action: 'sendInvitation'}).unwrap();
      console.log('успех')
    } catch (error) {
      console.log('ошибка', error)
    } 
  }

  const acceptOffer = async() => {
    try {
      await actionFriend({myId: myUserId, friendId: user._id, action: 'acceptOffer'}).unwrap();
      client.emit('refreshFriends')
      console.log('успех')
    } catch (error) {
      console.log('ошибка', error)
    } 
  } 

  const writeMessage = async() => {
    console.log(myUserId);
    const roomId = await wtiteMessage2({myId: myUserId, hisId: user._id})
    console.log(roomId.data)
    client.emit('create', roomId.data)
    client.emit('refreshRooms', roomId.data)
    navigate(`/room/${roomId.data}`)
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

  const waitFriend = user.friends.wait.includes(myUserId)

  return (
    <div className={classes.card}>
        <h1>{user.login}</h1>
        <button onClick={writeMessage}>Написать сообщение</button>
        {waitFriend && <h3>Заявка отправлена</h3>}
        {whichButton()}
    </div>
  )
}
