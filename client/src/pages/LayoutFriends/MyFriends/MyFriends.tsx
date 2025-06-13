
import { useEffect, useState } from 'react'
import { SearchInput } from '../../../UI/SearchInput/SearchInput';
import { useGetMyFriendsByLoginQuery } from '../../../store/userApi';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { UserCard } from '../../../UI/UserCard/UserCard';
import List from '../../../components/List/List';
import getSocketClient from '../../../socket';
import classes from './MyFriends.module.css'

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
      {data?.length > 0 && <SearchInput inputValue={inputValue} setInputValue={setInputValue}/>}
      {data?.length !== 0 && data?.length !== undefined ? <List items={data} renderItem={(user) => <UserCard key={user._id} myUserId={userId} user={user} type='basic'/>}/> 
      : <div className={classes.div}><h1 className={classes.title}>У вас пока нет друзей !</h1><Link to={'/friends/addToFriends'} className={classes.link}>Найти друзей</Link></div>}
    </div>
  )
}

