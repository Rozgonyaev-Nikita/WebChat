import React, { useEffect, useState } from 'react'
import { useGetAllUsersByLoginQuery } from '../../../store/userApi';
import { SearchInput } from '../../../UI/SearchInput/SearchInput';
import List from '../../../components/List/List';
import { UserCard } from '../../../UI/UserCard/UserCard';
import { useAppSelector } from '../../../hooks/reduxHooks';

export const AddToFriends = () => {
  const myUser = useAppSelector(state => state.auth.user)
  const [inputValue, setInputValue] = useState('');
  
  const {data} = useGetAllUsersByLoginQuery({inputValue, id: myUser._id})

  return (
    <div>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>
      {data && data.length ? <List items={data} renderItem={(friendUser) => <UserCard myUser={myUser._id} key={friendUser._id} user={friendUser} type='addFriend' />}/> : <h1>Такого пользователя нет!</h1>}
    </div>
  )
}
