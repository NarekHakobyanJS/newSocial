import { useDispatch } from 'react-redux'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { logout } from '../../state/authReducer'


type HeaderPropsType = {
  isAuth: boolean
  login: string
}
const Header = (props: HeaderPropsType) => {
  const dispatch = useDispatch<any>()

  const logOut = () => {
    dispatch(logout())
  }
  
  return (
    <header>
      <h1>logo</h1>
      <div className='loginBlock'>
        {
          props.isAuth ?
            <div>
              <h5>{props.login}</h5>
              <button onClick={logOut}>Log out</button>
            </div>
            : <NavLink to={'/login'}>login</NavLink>
        }
      </div>
    </header>
  )
}

export default Header