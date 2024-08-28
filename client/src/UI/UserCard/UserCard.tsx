import React, { FC } from 'react'
import classes from './UserCard.module.css'
import { usePatchFriendsMutation } from '../../store/userApi';
import { useAddPrivateRoomMutation } from '../../store/roomApi';
import { useNavigate } from 'react-router-dom';
import getSocketClient from '../../socket';
import { IUser } from '../../types/IUser';
// import client from '../../socket';


interface IUserCard {
    myUserId: string;
    user: IUser;
    type?: 'basic' | 'addFriend' | 'wait';
}

export const UserCard: FC<IUserCard> = ({myUserId, user, type = 'basic'}) => {
  const client = getSocketClient();
  const [actionFriend] = usePatchFriendsMutation();
  const [wtiteMessage2, {data}] = useAddPrivateRoomMutation();

  const navigate = useNavigate();

  // console.log('user', user)
  const addnewFriend = async() => {
    try {
      await actionFriend({myId: myUserId, friendId: user._id, action: 'sendInvitation'}).unwrap();
      client.emit('refreshWaitFriends', user._id)
      console.log('успех')
    } catch (error) {
      console.log('ошибка', error)
    } 
  }

  const acceptOffer = async() => {
    try {
      await actionFriend({myId: myUserId, friendId: user._id, action: 'acceptOffer'}).unwrap();
      client.emit('refreshMyFriends', user._id)
      console.log('успех')
    } catch (error) {
      console.log('ошибка', error)
    } 
  } 

  const writeMessage = async() => {
    console.log(myUserId);
    const {data: {id: roomId, isHave}} = await wtiteMessage2({myId: myUserId, hisId: user._id})//!!!! если уже созданна комната то ...
    console.log(data)
    if(!isHave){
    client.emit('create', roomId)
    client.emit('refreshRooms', {room: roomId, recipient: user._id})
    }
    navigate(`/room/${roomId}`)
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
