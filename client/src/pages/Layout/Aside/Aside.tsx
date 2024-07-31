import React from 'react'
import classes from './Aside.module.css'
import { Link } from 'react-router-dom'

export const Aside = () => {
  return (
    <aside className={classes.aside}>
        <Link to='/'>Сообщения</Link>
        <Link to='/friends'>Друзья</Link>
    </aside>
  )
}
