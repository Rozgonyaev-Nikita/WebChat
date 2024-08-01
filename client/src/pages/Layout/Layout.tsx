import React, { useEffect } from 'react'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import classes from './Layout.module.css'
import { Aside } from './Aside/Aside'
import { MainPage } from '../MainPage/MainPage'
import { useBack } from '../../hooks/useBack'

export const Layout = () => {
    useBack()
  return (
    <>
        <Header/>
        <div className={classes.wrapper}>
            <Aside/>
            <main className={classes.main}>
              <MainPage/>
            </main>
        </div>
        <Footer/>
    </>
  )
}
