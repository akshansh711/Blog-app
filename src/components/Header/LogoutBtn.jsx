import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/Auth'
import { logout } from '../../store/authSlice'


function LogoutBtn() {
    const dispatch = useDispatch()
    const handleLogout = () => {
        authService.logout().then(() => {
        dispatch(logout())
        })
    }
  return (
    <button className='inline-block px-6 py-4 duration-200 hover:bg-blue-100 rounded-full font-medium' 
    onClick={handleLogout}>Logout</button>
  )
}

export default LogoutBtn
