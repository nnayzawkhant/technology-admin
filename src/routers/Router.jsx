import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Error from '../pages/Error';
import Settings from '../pages/Settings';
import MyDeatails from '../cards/myDetails/MyDeatails';
import Profile from '../cards/Profile/Profile';
import Notification from '../cards/Notification/Notification';
import Categories from '../pages/Categories';
import Users from '../pages/Users';
import Posts from '../pages/Posts';

const Router = () => {
  return (
      <Routes>
        <Route path='/' element={<Navigate to="/dashboard" element={<Dashboard/>}/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/settings' element={<Settings/>}>
          <Route path='mydetails' element={<MyDeatails />} />
          <Route path='profile' element={<Profile/>}/>
          <Route path='notification' element={<Notification/>}/>  
        </Route> 
        <Route path='/error' element={<Error/>}/>
      </Routes>
  )
}

export default Router