import React from 'react'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import classes from './Layout.module.css'
import { Aside } from './Aside/Aside'
import { MainPage } from '../MainPage/MainPage'
import { useBack, useIsAuth } from '../../hooks'

export const Layout = () => {
    useBack();
    useIsAuth()
  return (
    <>
        <Header/>
        <div className={classes.wrapper}>
        <div className={classes.wrapperMain}>
            <Aside/>
            
            <main className={classes.main}>
              <MainPage/>
            </main>
            </div>
        </div>
        <Footer/>
    </>
  )
}
