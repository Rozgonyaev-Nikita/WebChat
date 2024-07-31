import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SearchInput } from '../../../UI/SearchInput/SearchInput';
import { useGetMyFriendsByLoginQuery } from '../../../store/userApi';

export const MyFriends = () => {
  const [inputValue, setInputValue] = useState('');
  const {data} = useGetMyFriendsByLoginQuery(inputValue)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm  = searchParams.get('search');
    console.log(searchTerm)
    console.log('dt', data)
  }, [data])
  return (
    <div>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>
      <div>MyFriends</div>
    </div>
  )
}

