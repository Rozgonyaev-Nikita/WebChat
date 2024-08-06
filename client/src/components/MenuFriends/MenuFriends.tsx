import React, { useState } from 'react'
import classes from './MenuFriends.module.css'
import { SearchInput } from '../../UI/SearchInput/SearchInput'
import { useNavigate } from 'react-router-dom'

export const MenuFriends = () => {
    const [toogle, setToogle] = useState<'left' | 'middle' | 'right'>('left')

    const navigate = useNavigate();


    const myFrendsOpen = () => {
        setToogle('left')
        navigate('/friends')
    }

    const addFrendOpen = () => {
        setToogle('middle')
        navigate('/friends/addToFriends')
    }

    const showApplication = () => {
      setToogle('right')
      navigate('/friends/friendRequests')
  }

  return (
    <div>
        <button className={toogle === 'left' ? classes.active : ''} onClick={myFrendsOpen}>Мои друзья</button>
        <button className={toogle === 'middle' ? classes.active : ''} onClick={addFrendOpen}>Найти друзей</button>
        <button className={toogle === 'right' ? classes.active : ''} onClick={showApplication}>Заявки</button>
    </div>
  )
}
