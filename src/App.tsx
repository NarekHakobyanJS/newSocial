
import Nav from './components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUserData } from './state/authReducer';
import { useEffect } from 'react';



function App() {
  const dispatch = useDispatch<any>()
  useEffect(() => {
    dispatch(getAuthUserData())
  }, [])
  
  return (
    <div className="App">
      <HeaderContainer />
      <div className='AppContent'>
        <Nav />
        <Routes>
          <Route path='/profile/:id' element={<ProfileContainer />} />
          <Route path='/dialogs' element={<DialogsContainer updateNewMessageBody={() => {}}/>} />
          <Route path="/users" element={<UsersContainer />}/>
          <Route path='/login' element={<Login /> }/>
        </Routes>
      </div>

    </div>
  );
}

export default App;
