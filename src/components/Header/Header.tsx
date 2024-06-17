import './Header.css'
import { NavLink } from 'react-router-dom'


type HeaderPropsType = {
  isAuth: boolean
  login: string
}
const Header = (props: HeaderPropsType) => {
  return (
    <header>
      <h1>logo</h1>
      <div className='loginBlock'>
        {
          props.isAuth ? <h5>{props.login}</h5> : <NavLink to={'/login'}>login</NavLink>
        }
      </div>
    </header>
  )
}

export default Header