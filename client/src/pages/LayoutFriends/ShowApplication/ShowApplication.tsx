import React, { useEffect, useState } from 'react'
import { IUser } from '../../../types/IRoom'
import List from '../../../components/List/List'
import { UserCard } from '../../../UI/UserCard/UserCard'
import { useAppSelector } from '../../../hooks/reduxHooks'
import axios from 'axios'


export const ShowApplication = () => {
    const [users, setUsers] = useState<IUser[]>([])

    const myUser = useAppSelector(u => u.auth.user._id)

    useEffect(() => {
            axios.get('http://localhost:5000/api/friends/friendRequests', {
                params: {
                    id: myUser
                }
            }).then(res => setUsers(res.data))
              .catch(error => console.log(error))
        
    }, [])
    
  return (
    <div>
        <List items={users} renderItem={(user) => <UserCard key={user._id} user={user} myUser={myUser} type='wait'/>}/>
    </div>
  )
}
