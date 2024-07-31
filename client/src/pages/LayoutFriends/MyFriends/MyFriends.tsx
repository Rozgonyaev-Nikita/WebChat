import axios from 'axios'
import React, { useEffect } from 'react'

export const MyFriends = () => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchTerm  = searchParams.get('search');
    axios.get('http://localhost:5000/api/friends', {
      params: {
          search: 'cazan123'
      }
  })
  .then(response => {
      console.log('Найденные пользователи:', response.data);
  })
  .catch(error => {
      console.error('Ошибка:', error);
  });
  }, [])
  return (
    <div>MyFriends</div>
  )
}
