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
}

export const CreateGroupChat: FC<ICreateGroupChatProps> = ({addUsers, myId}) => {
  const client = getSocketClient();
  const [newChat, setNewChat] = useState<INewChat>({ image: null, nameRoom: '', usersId: [...addUsers, myId]});

  const [createGroupRoom] = useAddGroupRoomMutation();


  const createChat = async() => {
    const resultRoom = await createGroupRoom(newChat)
    console.log(resultRoom)
    client.emit('create', resultRoom.data._id)
    client.emit('refreshRoomss', {room: resultRoom.data._id, recipients: addUsers})//dfg{room: roomId, recipient: user._id}
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
