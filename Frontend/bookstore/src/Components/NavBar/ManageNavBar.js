import React from 'react'
import { useLocation } from 'react-router'
import NavBar from './NavBar'


const ManageNavBar = () => {
    const location = useLocation()
    const noNavBar = ['/','/signup']
  return (
    <div>
        {location.pathname !== '/' && location.pathname !== '/signup' ?  <NavBar/> : null}
    </div>
  )
}

export default ManageNavBar