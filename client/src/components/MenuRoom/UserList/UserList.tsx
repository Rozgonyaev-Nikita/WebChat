import React, { FC, useEffect, useMemo } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks';
import List from '../../List/List';
import { UserItem } from './UserItem/UserItem';
import { IUser, IUserOnline } from '../../../types/IUser';
 


interface IUserListProps {
  users: IUser[];
}

export const UserList: FC<IUserListProps> = ({users}) => {

  const usersOnline = useAppSelector(state => state.usersOnline.usersOnline)

  const userOnline: IUserOnline[] = useMemo(() => {
    return users.map(user => {
      if(usersOnline.includes(user._id)) {
         return {...user, isOnline: true}
      } 
      else {
        return {...user, isOnline: false}
      }
    })
  }, [usersOnline, users])
  console.log(userOnline)

  // useEffect(() => {
  //   const karp = users.map(user => {
  //     if(usersOnline.includes(user)) {
  //        return {user, isOnline: true}
  //     } 
  //     else {
  //       return {user, isOnline: false}
  //     }
  //   })
  //   console.log(karp)
  // }, [])
  
  return (
    <div>
      <List items={userOnline} renderItem={(user) => <UserItem user={user}/>}/>
    </div>
  )
}
