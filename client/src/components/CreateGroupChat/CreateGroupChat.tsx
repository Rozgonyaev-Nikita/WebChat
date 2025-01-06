import React, { FC, useEffect, useState } from 'react'
import classes from './CreateGroupChat.module.css'
import { ChooseAvatar } from '../../UI/ChooseAvatar/ChooseAvatar'
import { useAddGroupRoomMutation } from '../../store/roomApi';
import { useAppSelector } from '../../hooks/reduxHooks';
import getSocketClient from '../../socket';

export interface INewChat {
  image: Blob;
  nameRoom: string;
  usersId: string[];
}

interface ICreateGroupChatProps {
  addUsers: string[];
  myId: string;
  onCloseModal: () => void;
}

export const CreateGroupChat: FC<ICreateGroupChatProps> = ({addUsers, myId, onCloseModal}) => {
  const client = getSocketClient();
  const [newChat, setNewChat] = useState<INewChat>({ image: null, nameRoom: '', usersId: [...addUsers, myId]});
  console.log('newChat', newChat)

  const [createGroupRoom] = useAddGroupRoomMutation();


  const createChat = async() => {
    const chat = new FormData();
    chat.append('nameRoom', newChat.nameRoom);
    chat.append('avatar', newChat.image || null);
    newChat.usersId.forEach(userId => {
      chat.append('usersId', userId); // добавляем каждый элемент массива
    });

    const resultRoom = await createGroupRoom(chat)
    console.log(resultRoom)
    client.emit('create', resultRoom.data._id)
    client.emit('refreshRoomss', {room: resultRoom.data._id, recipients: addUsers})//dfg{room: roomId, recipient: user._id}
    onCloseModal();
  }

  useEffect(() => {
    setNewChat(prevChat => ({ ...prevChat, usersId: addUsers }));
  }, [addUsers]);

  return (
    <div className={classes.createChat}>
      <div className={classes.info}>
        <ChooseAvatar newChat={newChat} setNewChat={setNewChat} />
        <input className={classes.input} type="text" value={newChat.nameRoom} onChange={(e) => setNewChat({ ...newChat, nameRoom: e.target.value })} />
      </div>
      <button className={classes.createButton} onClick={createChat}>Создать чат</button>
    </div>
  )
}
