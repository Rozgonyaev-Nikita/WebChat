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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm  = searchParams.get('search');
  }, [data])

  return (
    <div>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>
      {data && data.length ? <List items={data} renderItem={(friendUser) => <UserCard myUser={myUser._id} key={friendUser._id} user={friendUser} isAddFriend={true}/>}/> : <h1>Такого пользователя нет!</h1>}
    </div>
  )
}
