import React, { useEffect, useState } from 'react'
import { IUser } from '../../../types/IRoom'
import List from '../../../components/List/List'
import { UserCard } from '../../../UI/UserCard/UserCard'
import { useAppSelector } from '../../../hooks/reduxHooks'
import axios from 'axios'
import { SearchInput } from '../../../UI/SearchInput/SearchInput'
import { useGetWaitFriendsQuery } from '../../../store/userApi'


export const ShowApplication = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [inputValue, setInputValue] = useState('')

    const myUser = useAppSelector(u => u.auth.user._id)
    
    const {data} = useGetWaitFriendsQuery({search: inputValue, userId: myUser})

    // useEffect(() => {
    //         axios.get('http://localhost:5000/api/friends/friendRequests', {
    //             params: {
    //                 id: myUser,
    //                 search: inputValue
    //             }
    //         }).then(res => setUsers(res.data))
    //           .catch(error => console.log(error))
        
    // }, [inputValue])
    
  return (
    <div>
        <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>
      {data && <List items={data} renderItem={(user) => <UserCard key={user._id} user={user} myUser={myUser} type='wait'/>}/>}
    </div>
  )
}
