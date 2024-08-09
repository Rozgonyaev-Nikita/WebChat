import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import client from '../../socket'
import { useAppSelector } from '../../hooks/reduxHooks';


export const MainPage = () => {
  const rooms = useAppSelector(u => u.auth.user.rooms);
  useEffect(() => {
    
    client.on('connect', () => {
      client.emit('connection')
      console.log('Подключился')
    })
  
    client.on('disconnect', () => { 
      console.log("Отключение")
    })

    return () => {
      client.disconnect();
      console.log('som')
    }
  }, [client])

  useEffect(() => {
    if(rooms.length !== 0){
      console.log('enterInRooms')
      client.emit('enterInRooms', rooms)
    }

  }, [rooms])
  
  
  return (
    <>
      <Outlet/>
    </>
  )
}
