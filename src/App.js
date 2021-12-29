import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { Route } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';

const App = (props) => {
  return (
      <div className="app-wrapper">
        <HeaderContainer store={props.store}/>
        <Navbar/>
        <div className="app-wrapper-content">
          <Route path='/profile/:userId?' render={() => <ProfileContainer store={props.store} />}/>
          <Route path='/dialogs' render={() => <DialogsContainer store={props.store} />}/>
          <Route path='/users' render={() => <UsersContainer store={props.store} />}/>
          <Route path='/news' render={() => <News />}/>
          <Route path='/music' render={() => <Music />}/>
          <Route path='/settings' render={() => <Settings />}/>
          <Route path='/login' render={() => <Login />}/>
        </div>
      </div>
  );
}

export default App;
