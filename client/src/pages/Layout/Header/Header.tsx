import React, { FC } from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { IoMdNotificationsOutline } from "react-icons/io";
import avatarDefault from '../../../images/avatarDefault.webp'
import { ModalFloat } from '../../../UI/ModalFloat/ModalFloat';
import { Profile } from '../../../components/Profile/Profile';
import { Avatar, ESize } from '../../../UI/Avatar/Avatar';



export const Header = () => {
  const { login, avatar } = useAppSelector(u => u.auth.user)
  return (
    <header className={classes.header}>
      <h1>Мой чат</h1>
      
      {/* <RxAvatar size={30}/> */}
      <div className={classes.groupManagement}>
      <IoMdNotificationsOutline size={30} />
        <div className={classes.profile}>
          <ModalFloat controlElement={<Avatar avatar={avatar} size={ESize.MIN}/>}>
            <Profile/>
          </ModalFloat>
        </div>
      </div>

    </header>
  )
}