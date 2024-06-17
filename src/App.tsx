
import Nav from './components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainerFunction';
import HeaderContainer from './components/Header/HeaderContainer';




function App() {
  return (
    <div className="App">
      <HeaderContainer />
      <div className='AppContent'>
        <Nav />
        <Routes>
          <Route path='/profile/:id' element={<ProfileContainer />} />
          <Route path='/dialogs' element={<DialogsContainer/>} />
          <Route path="/users" element={<UsersContainer />}/>
        </Routes>
      </div>

    </div>
  );
}

export default App;
