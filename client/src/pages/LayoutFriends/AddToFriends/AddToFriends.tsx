import React, { useEffect, useState } from 'react'
import { useGetAllUsersByLoginQuery } from '../../../store/userApi';
import { SearchInput } from '../../../UI/SearchInput/SearchInput';
import List from '../../../components/List/List';
import { UserCard } from '../../../UI/UserCard/UserCard';
import { useAppSelector } from '../../../hooks/reduxHooks';

export const AddToFriends = () => {
  const myUser = useAppSelector(state => state.auth.user)
  console.log('myFriends', )
  const [inputValue, setInputValue] = useState('');
  console.log('myUser._id', myUser._id)
  
  const {data} = useGetAllUsersByLoginQuery({inputValue, id: myUser._id})
  console.log('offer2', data)//data обновляется но список не перерисовыывается
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm  = searchParams.get('search');
    console.log(searchTerm)
    console.log('dt', data)
  }, [data])

  return (
    <div>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>
      {data && data.length ? <List items={data} renderItem={(friendUser) => <UserCard myUser={myUser._id} key={friendUser._id} user={friendUser} isAddFriend={true}/>}/> : <h1>Такого пользователя нет!</h1>}
    </div>
  )
}
