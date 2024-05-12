
import React,{ useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/Auth';
import './App.css'
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return null;
  } else {
    return (
      <div className='min-h-screen flex flex-wrap content-between bg-slate-400'>
        <div className='w-full block'>
          <Header />
          <main>
           Todo: <Outlet />
          </main>
          <div className='pt-96'>
          <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default App
