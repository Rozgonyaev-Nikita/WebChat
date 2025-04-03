import React, { useEffect, useState } from 'react'
import classes from './ShowApplication.module.css'
import List from '../../../components/List/List'
import { UserCard } from '../../../UI/UserCard/UserCard'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { SearchInput } from '../../../UI/SearchInput/SearchInput'
import { useGetWaitFriendsQuery } from '../../../store/userApi'
import getSocketClient from '../../../socket'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../../../types/IUser'


export const ShowApplication = () => {
  const navigate = useNavigate()
  const client = getSocketClient();
  const [inputValue, setInputValue] = useState('')

  const myUser = useAppSelector(u => u.auth.user._id)

  const { data, refetch } = useGetWaitFriendsQuery({ search: inputValue, userId: myUser })

  useEffect(() => {
    try {
      refetch();
      console.log('refw')
      client.on('refreshWaitFriendsClient', () => {
        refetch();
      })
      return () => {
        client.off('refreshWaitFriendsClient')
      }
    } catch (error) {
      console.log(error)
      navigate('/avtorization')
    }
  }, [])
    ;

  return (
    <div>
      {data?.length > 0 && <SearchInput inputValue={inputValue} setInputValue={setInputValue} />}
      <List items={data}
        renderItem={(user) => 
          <UserCard key={user._id} user={user} myUserId={myUser} type='wait' />} 
            condition={Boolean(data?.length > 0)}
            inThisCase={<h1 className={classes.no}>Заявок нет!</h1>} />
    </div>
  )
}
