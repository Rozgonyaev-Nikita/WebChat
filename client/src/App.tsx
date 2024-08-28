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
import { LayoutFriends } from './pages/LayoutFriends/LayoutFriends';
import { MyFriends } from './pages/LayoutFriends/MyFriends/MyFriends';
import { AddToFriends } from './pages/LayoutFriends/AddToFriends/AddToFriends';
import { ShowApplication } from './pages/LayoutFriends/ShowApplication/ShowApplication';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Chat/>}/>
        <Route path='/room/:roomName' element={<RoomInside/>}/>
        <Route path='/friends' element={<LayoutFriends/>}>
          <Route index element={<MyFriends/>}/>
          <Route path='/friends/addToFriends' element={<AddToFriends/>}/>
          <Route path='/friends/friendRequests' element={<ShowApplication/>}/>
        </Route>
      </Route>
      <Route path='/registration' element={<Registration/>}/>
      <Route path='/avtorization' element={<Avtorization/>}/>
    </Routes>
  );
}

export default App;
