import React, { useState } from 'react'
import classes from './MenuFriends.module.css'
import { useNavigate } from 'react-router-dom'
import { Space } from 'antd';
import MyButton from '../../UI/MyButton/MyButton';

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
    <div className={classes.wrapper1}>
    <Space className={classes.wrapper2} size={[8, 16]}>
        <button className={toogle === 'left' ? classes.active : classes.sleep} onClick={myFrendsOpen}>Мои друзья</button>
        <button className={toogle === 'middle' ? classes.active : classes.sleep} onClick={addFrendOpen}>Найти друзей</button>
        <button className={toogle === 'right' ? classes.active : classes.sleep} onClick={showApplication}>Заявки</button>
      <hr className={classes.hr} />
    </Space>
    <hr />
    </div>
  )
}
