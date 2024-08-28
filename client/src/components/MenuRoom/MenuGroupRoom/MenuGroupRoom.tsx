import React, { FC, useState } from 'react'
import classes from './MenuGroupRoom.module.css'
import { MyModal } from '../../../UI/MyModal/MyModal';
import { UserList } from '../UserList/UserList';
import { IUser } from '../../../types/IUser';
import useModal from '../../../hooks/useModal';

interface IMenuGroupRoomProps{
    nameRoom: string;
    users: IUser[];
    myUser: string;
}

export const MenuGroupRoom: FC<IMenuGroupRoomProps> = ({nameRoom, users}) => {
  // const [visableModal, setVisableModal] = useState(false)
  const {isOpenModal, onOpenModal, onCloseModal} = useModal()
  return (
    <div>
        <div className={classes.menuRoom}>
        <h2>{nameRoom}</h2>
        <h5 onClick={onOpenModal}>{`Количество участников ${users.length}`}</h5>
        <MyModal isOpenModal={isOpenModal} close={onCloseModal} >
          <UserList users={users}/>
        </MyModal>
    </div>
    </div>
  )
}
