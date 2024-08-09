import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SearchInput } from '../../../UI/SearchInput/SearchInput';
import { useGetMyFriendsByLoginQuery } from '../../../store/userApi';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { UserCard } from '../../../UI/UserCard/UserCard';
import List from '../../../components/List/List';

export const MyFriends = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [inputValue, setInputValue] = useState('')

  const userId = useAppSelector(user => user.auth.user._id)
  const {data = []} = useGetMyFriendsByLoginQuery({search, userId});

  useEffect(() => {
    const st = searchParams.get('search') || '';
    setSearch(st);
  }, [inputValue])

  return (
    <div>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>
      {data?.length !== 0 && data?.length !== undefined ? <List items={data} renderItem={(user) => <UserCard key={user._id} user={user} isAddFriend={false}/>}/> : <h1>Такого пользователя нет!</h1>}
    </div>
  )
}

