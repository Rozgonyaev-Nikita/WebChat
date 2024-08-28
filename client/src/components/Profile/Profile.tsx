import React from 'react'
import classes from './Profile.module.css'
import { useAppSelector } from '../../hooks/reduxHooks'
import { IoExitOutline } from "react-icons/io5";
import { Avatar, ESize } from '../../UI/Avatar/Avatar';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const user = useAppSelector(state => state.auth.user);
  
  return (
    <div className={classes.profile}>
      <Avatar avatar={user.avatar} size={ESize.MEDIUM}/>
      <h2 className={classes.name}>{user.login}</h2>
      <Link to='/avtorization' className={classes.action}>
      <IoExitOutline color='red'/> Выйти
      </Link>
    </div>
  )
}
