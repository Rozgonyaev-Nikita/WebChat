import React from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className={classes.header}>
      <Link to='/registration'>Регистрация</Link>
      <Link to='/avtorization'>Авторизация</Link>
    </header>
  )
}
