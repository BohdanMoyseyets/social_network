import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import { Route } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader';
import { AppStateType } from './redux/redux-store';

// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(()=>import('./components/Dialogs/DialogsContainer'));

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  initializeApp: () => void
  // state: AppStateType
}

class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {
  shouldComponentUpdate(nextProps: AppStateType, nextState: AppStateType){
    return nextProps != this.props || nextState != this.state
  }
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    console.log("yoyoyo");
    if(!this.props.initialized){
      return <Preloader/>
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
          <Route path='/dialogs' render={() =>{
            return <React.Suspense fallback={<Preloader/>}><DialogsContainer /></React.Suspense>
          } } />
          <Route path='/users' render={() => <UsersContainer headTitle={"asdasdasdasd"} />} />
          <Route path='/news' render={() => <News />} />
          <Route path='/music' render={() => <Music />} />
          <Route path='/settings' render={() => <Settings />} />
          <Route path='/login' render={() => <Login />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})


export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, {initializeApp}))(App);
