import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reduxHooks';
import getSocketClient from '../../socket'



export const MainPage = () => {
  const client = getSocketClient()
  const {_id, rooms} = useAppSelector(u => u.auth.user);
  useEffect(() => {
    if(client){
      client.emit('register', _id);
      console.log('client', client)
    client.on('connect', () => {
      // client.emit('connection', _id)
      console.log('Подключился')
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
      console.log('enterInRooms')
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
