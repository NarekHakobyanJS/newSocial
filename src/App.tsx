
import Nav from './components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { useDispatch } from 'react-redux';
import { getAuthUserData } from './state/authReducer';
import { Suspense, useEffect } from 'react';
import React from 'react';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

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
          <Route path='/profile/:id' element={<Suspense fallback={<h1>loding...</h1>}><ProfileContainer /></Suspense>} />
          <Route path='/dialogs' element={<Suspense fallback={<h1>loding...</h1>}><DialogsContainer updateNewMessageBody={() => {}}/></Suspense>} />
          <Route path="/users" element={<Suspense fallback={<h1>loding...</h1>}><UsersContainer /></Suspense>}/>
          <Route path='/login' element={<Login /> }/>
          <Route path='*' element={<><img src='https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1' /></>}/>
        </Routes>
      </div>

    </div>
  );
}

export default App;
