import React, { useEffect, useState } from 'react'
import { useGetMyFriendsByLoginQuery } from '../../../store/userApi';
import { SearchInput } from '../../../UI/SearchInput/SearchInput';
import List from '../../../components/List/List';
import { UserCard } from '../../../UI/UserCard/UserCard';
import { useAppSelector } from '../../../hooks/reduxHooks';

export const AddToFriends = () => {
  const user = useAppSelector(state => state.auth.user)
  console.log('myFriends', )
  const [inputValue, setInputValue] = useState('');
  const {data} = useGetMyFriendsByLoginQuery({inputValue, myFriends: JSON.stringify([...user.friends.myFriends, user._id])})
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm  = searchParams.get('search');
    console.log(searchTerm)
    console.log('dt', data)
  }, [data])

  return (
    <div>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>
      {data?.length !== 0 && data?.length !== undefined ? <List items={data} renderItem={(user) => <UserCard key={user._id} user={user} isAddFriend={true}/>}/> : <h1>Такого пользователя нет!</h1>}
    </div>
  )
}
