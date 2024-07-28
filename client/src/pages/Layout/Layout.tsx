import React from 'react'
import { Header } from './Header/Header'
import { Footer } from './Footer/Footer'
import classes from './Layout.module.css'
import { Aside } from './Aside/Aside'
import { MainPage } from '../MainPage/MainPage'

export const Layout = () => {
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
