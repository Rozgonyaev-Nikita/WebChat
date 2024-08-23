
import { useEffect, useState } from 'react'
import { SearchInput } from '../../../UI/SearchInput/SearchInput';
import { useGetMyFriendsByLoginQuery } from '../../../store/userApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { UserCard } from '../../../UI/UserCard/UserCard';
import List from '../../../components/List/List';
import getSocketClient from '../../../socket';

export const MyFriends = () => {
  const navigate = useNavigate();
  const client = getSocketClient()
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
    try {
      console.log('refmy')
      refetch();
      client.on('refreshMyFriendsClient', () => { 
        
        refetch();
  })
  return () => {
    client.off('refreshMyFriendsClient');
  }
    } catch (error) {
      console.log(error)
      navigate('/')
    }
  }, [])

  return (
    <div>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>
      {data?.length !== 0 && data?.length !== undefined ? <List items={data} renderItem={(user) => <UserCard key={user._id} myUserId={userId} user={user} type='basic'/>}/> : <div><h1>Друзей нет</h1><h2>Ты жалок!</h2></div>}
    </div>
  )
}

