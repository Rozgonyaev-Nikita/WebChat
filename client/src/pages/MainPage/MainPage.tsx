import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import getSocketClient from '../../socket'
import { addUserOnline, getUsersOnline, removeUserOnline } from '../../store/usersOnlineSlice';
import axios from 'axios';



export const MainPage = () => {
  const client = getSocketClient()
  const {_id, rooms} = useAppSelector(u => u.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if(client){
      client.emit('register', _id);
      axios.get('http://localhost:5000/api/usersOnline')
      .then( res => dispatch(getUsersOnline(res.data)))
    client.on('connect', () => {
      // client.emit('connection', _id)
      console.log('Подключился')
    })

    client.on('user_online', (user) => {
      dispatch(addUserOnline(user))
    })

    client.on('user_offline', (user) => {
      dispatch(removeUserOnline(user))
    })
  
    client.on('disconnect', () => { 
      console.log("Отключение")
    })

    return () => {
      client.disconnect();
      console.log('som')
    }
  }
  }, [client])

  useEffect(() => {
    if(client){
    if(rooms.length !== 0){
      client.emit('enterInRooms', rooms)
    }
  }
  }, [rooms])
  
  
  return (
    <>
      <Outlet/>
    </>
  )
}
