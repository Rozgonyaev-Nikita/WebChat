import React, { FC, useState } from 'react'
import classes from './ParticipantItem.module.css'
import { IUser } from '../../../../types/IUser'
import { Avatar } from '../../../../UI/Avatar/Avatar';
import Switch from 'react-switch';

interface IParticipantItemProps{
  friend: IUser;
  addUsers: string[];
  setAddUsers: (user: string[]) => void;
}

export const ParticipantItem: FC<IParticipantItemProps> = ({friend, addUsers, setAddUsers}) => {

  const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
      setIsToggled(!isToggled);
      if(isToggled){
        setAddUsers([...addUsers.filter(user => user !== friend._id)])
      } else {
        setAddUsers([...addUsers,friend._id])
      }
    };

  return (
    <div className={classes.item}>
      <Avatar avatar={friend.avatar} />
      <div className={classes.info}>
        <p>{friend.login}</p>
      </div>
      <label className={classes.toggle}>
                {/* <span>{isToggled ? 'Включен' : 'Выключен'}</span> */}
                <Switch 
                    className='toogleBut'
                    onChange={handleToggle}
                    checked={isToggled}
                    offColor="#888"
                    onColor="#0C0"
                />
            </label>
    </div>
  )
}
