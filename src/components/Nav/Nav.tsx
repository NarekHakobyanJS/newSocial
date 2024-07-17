import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../state/store'

const Nav = () => {
 const {userId} = useSelector((state : AppStateType) => state.auth)

 
  return (
    <nav>
        <div className='navlink'>
            <NavLink to={`/profile/${userId}`}>profile</NavLink>
            <NavLink to='/dialogs'>dialogs</NavLink>
            <NavLink to='/users'>users</NavLink>
            <NavLink to='/chat'>chat</NavLink>
        </div>
    </nav>
  )
}

export default Nav