import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import client from '../../socket'

export const MainPage = () => {
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
  
  return (
    <>
      <Outlet/>
    </>
  )
}
