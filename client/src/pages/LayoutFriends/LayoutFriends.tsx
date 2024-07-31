import React from 'react'
import { Outlet } from 'react-router-dom'
import { MenuFriends } from '../../components/MenuFriends/MenuFriends'

export const LayoutFriends = () => {
  return (
    <div>
      <MenuFriends/>
      <Outlet/>
    </div>
  )
}
