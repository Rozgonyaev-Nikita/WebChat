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

    // useEffect(() => {
    //     console.log('бумь');
    //     console.log('searchParams = ',searchParams)
    //     const st = searchParams.get('search') || ''
    //     console.log(st)
    //     setSearch(st); // Устанавливаем поиск на значение параметра или пустую строку
    //         axios.get('http://localhost:5000/api/friends/myFriends', {
    //             params: {
    //                 search: st,
    //                 userId: userId,
    //             },
    //         })
    //         .then(response => {
    //             console.log('Найденные пользователи:', response.data);
    //             setData(response.data)
    //         })
    //         .catch(error => {
    //             console.error('Ошибка:', error);
    //         });
        
    // }, [inputValue]); // Устанавливаем зависимость на location.search 

  useEffect(() => {
    const st = searchParams.get('search') || '';
    console.log('st', st);
    setSearch(st);
  }, [inputValue])

  return (
    <div>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>
      {data?.length !== 0 && data?.length !== undefined ? <List items={data} renderItem={(user) => <UserCard key={user._id} user={user} isAddFriend={false}/>}/> : <h1>Такого пользователя нет!</h1>}
    </div>
  )
}

