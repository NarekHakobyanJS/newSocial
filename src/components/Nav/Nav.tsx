import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
 
  return (
    <nav>
        <div className='navlink'>
            <NavLink to='/'>profile</NavLink>
            <NavLink to='/dialogs'>dialogs</NavLink>
            <NavLink to='/users'>users</NavLink>
        </div>
    </nav>
  )
}

export default Nav