import React from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/reduxHooks'

export const Header = () => {
  const userName = useAppSelector(u => u.auth.user.login)
  return (
    <header className={classes.header}>
      <Link to='/registration'>Регистрация</Link>
      <Link to='/avtorization'>Авторизация</Link>
      <h2>{userName}</h2>
    </header>
  )
}
