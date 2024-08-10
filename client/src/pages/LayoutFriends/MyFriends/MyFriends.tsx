
import { useEffect, useState } from 'react'
import { SearchInput } from '../../../UI/SearchInput/SearchInput';
import { useGetMyFriendsByLoginQuery } from '../../../store/userApi';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { UserCard } from '../../../UI/UserCard/UserCard';
import List from '../../../components/List/List';
import client from '../../../socket';

export const MyFriends = () => {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [inputValue, setInputValue] = useState('')

  const userId = useAppSelector(user => user.auth.user._id)
  const {data = [], refetch} = useGetMyFriendsByLoginQuery({search, userId});

  useEffect(() => {
    const st = searchParams.get('search') || '';
    setSearch(st);
  }, [inputValue])

  useEffect(() => {
    client.on('refreshRoom', () => { 
        try {
          refetch();
        console.log('refresh')
        } catch (error) {
          console.log(error)
        } 
      return () => {
        client.off('refreshRoom');
      }
    })
  }, [])

  return (
    <div>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>
      {data?.length !== 0 && data?.length !== undefined ? <List items={data} renderItem={(user) => <UserCard key={user._id} user={user} type='basic'/>}/> : <h1>Такого пользователя нет!</h1>}
    </div>
  )
}

