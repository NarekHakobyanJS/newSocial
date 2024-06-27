
import './Login.css'
import { Field, Form, Formik } from 'formik'
import axios from 'axios'


type LoginFormPropsType = {
  autorizationUserLogin : (user : any) => void
}

const LoginForm = ({autorizationUserLogin} : any) => {
  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
        rememberMe : false
      }}
      onSubmit={(values) => autorizationUserLogin(values)}
    >
      {
        ({values, handleChange, handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field name='login'/>
            </div>
            <div>
            <Field name='password'/>
             
            </div>
            <div>
              {/* <Field /> */}
              <input name='rememberMe' type="checkbox" checked={values.rememberMe} onChange={handleChange}/>
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

  const autorizationUserLogin = (user : any) => {
    console.log(user);
    axios.post('https://social-network.samuraijs.com/api/1.0/auth/login',
     {
      email : user.login,
      password : user.password,
      rememberMe : user.rememberMe

     })
     .then((res) => console.log(res.data))
  }
  return (
    <div>
      <h2>Login</h2>
      <LoginForm autorizationUserLogin={autorizationUserLogin}/>
    </div>
  )
}

export default Login