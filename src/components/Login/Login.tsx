
import './Login.css'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../state/authReducer'
import { Navigate, useNavigate } from 'react-router-dom'


type LoginFormPropsType = {
  autorizationUserLogin: (user: any) => void
}

const LoginForm = ({ autorizationUserLogin }: any) => {
  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
        rememberMe: false
      }}
      onSubmit={(values) => autorizationUserLogin(values)}
    >
      {
        ({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field name='login' />
            </div>
            <div>
              <Field name='password' />

            </div>
            <div>
              {/* <Field /> */}
              <input name='rememberMe' type="checkbox" checked={values.rememberMe} onChange={handleChange} />
              <span>rememeber me</span>
            </div>
            <div>
              <button type='submit'>login</button>
            </div>
          </form>
        )
      }
    </Formik>
  )
}
const Login = () => {
  const dispatch = useDispatch<any>()
  const auth = useSelector((state: any) => state.auth)
  

  const autorizationUserLogin = (user: any) => {
    dispatch(login(user.login, user.password, user.rememberMe))
  }

  if(auth.isAuth){
    return <Navigate to={`/profile/${auth.userId}`}/>
  }
  return (
    <div>
      <h2>Login</h2>
      <LoginForm autorizationUserLogin={autorizationUserLogin} />
    </div>
  )
}

export default Login