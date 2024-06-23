import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'
import { useSelector } from 'react-redux'

const Nav = () => {
 const {userId} = useSelector((state : any) => state.auth)

 
  return (
    <nav>
        <div className='navlink'>
            <NavLink to={`/profile/${userId}`}>profile</NavLink>
            <NavLink to='/dialogs'>dialogs</NavLink>
            <NavLink to='/users'>users</NavLink>
        </div>
    </nav>
  )
}

export default Nav