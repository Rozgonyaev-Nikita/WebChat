import React, { useEffect, useState } from 'react'
import List from '../../../components/List/List'
import { UserCard } from '../../../UI/UserCard/UserCard'
import { useAppSelector } from '../../../hooks/reduxHooks'
import axios from 'axios'
import { SearchInput } from '../../../UI/SearchInput/SearchInput'
import { useGetWaitFriendsQuery } from '../../../store/userApi'
import getSocketClient from '../../../socket'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../../../types/IUser'


export const ShowApplication = () => {
  const navigate = useNavigate()
  const client = getSocketClient();
    const [users, setUsers] = useState<IUser[]>([])
    const [inputValue, setInputValue] = useState('')

    const myUser = useAppSelector(u => u.auth.user._id)
    
    const {data, refetch} = useGetWaitFriendsQuery({search: inputValue, userId: myUser})

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
        <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>
      {data && <List items={data} renderItem={(user) => <UserCard key={user._id} user={user} myUserId={myUser} type='wait'/>}/>}
    </div>
  )
}
