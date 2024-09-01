import React, { useState } from 'react'
import classes from './ModalChat.module.css'
import { ImCross } from "react-icons/im";
import { ParticipantList } from '../Participant/ParticipantList/ParticipantList';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { useGetMyFriendsByLoginQuery } from '../../../store/userApi';
import List from '../../List/List';
import { ParticipantItem } from '../Participant/ParticipantItem/ParticipantItem';
import { CreateGroupChat } from '../../CreateGroupChat/CreateGroupChat';

interface IModalChatProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
}

export const ModalChat = ({isOpenModal, onCloseModal}) => {
  
  // console.log('addUsers', addUsers)
  const {_id} = useAppSelector(state => state.auth.user);
  const [addUsers, setAddUsers] = useState<string[]>([_id])

  const {data: friends} = useGetMyFriendsByLoginQuery({search: '', userId: _id})
  
  const rootState = [classes.modal];
  if (isOpenModal) {
    rootState.push(classes.active);
  }

  return (
    <div className={rootState.join(' ')}>
      <div className={classes.topPanel}>
      <p>Создание чата</p>
      <ImCross onClick={onCloseModal}/>
      </div>
      <List items={friends} className={classes.list} renderItem={(friend) => <ParticipantItem addUsers={addUsers} setAddUsers={setAddUsers} key={friend._id} friend={friend}/>}/>
      <CreateGroupChat myId={_id} addUsers={addUsers}/>
    </div>
  )
}
