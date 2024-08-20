import React, { FC, useState } from 'react'
import classes from './MenuGroupRoom.module.css'
import { MyModal } from '../../../UI/MyModal/MyModal';
import { UserList } from '../UserList/UserList';
import { IUser } from '../../../types/IUser';

interface IMenuGroupRoomProps{
    nameRoom: string;
    users: IUser[];
    myUser: string;
}

export const MenuGroupRoom: FC<IMenuGroupRoomProps> = ({nameRoom, users}) => {
  const [visableModal, setVisableModal] = useState(false)
  return (
    <div>
        <div className={classes.menuRoom}>
        <h2>{nameRoom}</h2>
        <h5 onClick={() => setVisableModal(true)}>{`Количество участников ${users.length}`}</h5>
        <MyModal visableModal={visableModal} setVisableModal={setVisableModal}>
          <UserList users={users}/>
        </MyModal>
    </div>
    </div>
  )
}
