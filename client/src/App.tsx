import React from 'react';
import './App.css';
import './rest.css'
import { Route, Routes } from 'react-router-dom';
import { Layout } from './pages/Layout/Layout';
import { MainPage } from './pages/MainPage/MainPage';
import { Chat } from './pages/Chat/Chat';
import Registration from './pages/Regisatration/Regisatration';
import Avtorization from './pages/Avtorization/Avtorization';
import { RoomInside } from './pages/RoomInside/RoomInside';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Chat/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/avtorization' element={<Avtorization/>}/>
        <Route path='/room/:roomName' element={<RoomInside/>}/>
      </Route>
    </Routes>
  );
}

export default App;
