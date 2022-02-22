import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import ProfileContainer from './components/Profile/ProfileContainer';
import { Login } from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader';
import { AppStateType } from './redux/redux-store';
import { UsersPage } from './components/Users/UsersContainer';
import { Button } from 'antd';

import { Breadcrumb, Layout, Menu } from 'antd'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Header } from './components/Header/Header';

const { SubMenu } = Menu
const { Content, Footer, Sider } = Layout

// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  initializeApp: () => void
  // state: AppStateType
}

class App extends React.Component<MapStatePropsType & MapDispatchPropsType> {
  shouldComponentUpdate(nextProps: AppStateType, nextState: AppStateType) {
    return nextProps != this.props || nextState != this.state
  }
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    console.log("yoyoyo");
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                /*  defaultSelectedKeys={['7']}*/
                /*  defaultOpenKeys={['sub1']}*/
                style={{ height: '100%' }}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                  <Menu.Item key="1"> <Link to="/profile">Profile</Link></Menu.Item>
                  <Menu.Item key="2"> <Link to="/dialogs">Messages</Link></Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                  <Menu.Item key="5"><Link to="/developers">Developers</Link></Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                  <Menu.Item key="9"><Link to="/chat">Chat</Link></Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>

              <Switch>
                <Route exact path='/'
                  render={() => <Redirect to={'/profile'} />} />

                <Route path='/dialogs' render={() => {
                  return <React.Suspense fallback={<Preloader />}><DialogsContainer /></React.Suspense>
                }} />

                <Route path='/profile/:userId?'
                  render={() => <ProfileContainer />} />

                <Route path='/developers'
                  render={() => <UsersPage headTitle={'Topchuk'} />} />

                <Route path='/login'
                  render={() => <Login />} />

                <Route path='/chat' render={() => {
                  return <React.Suspense fallback={<Preloader />}><ChatPage /></React.Suspense>
                }} />

                <Route path='*'
                  render={() => <div>404 NOT FOUND</div>} />
              </Switch>

            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>SN ©2022 Created by Bohdan Moiseiets</Footer>
      </Layout>
      // <div className="app-wrapper">
      //   <Button type="primary">PRESS ME</Button>
      //   <HeaderContainer />
      //   <Navbar />
      //   <div className="app-wrapper-content">
      //     <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
      //     <Route path='/dialogs' render={() =>{
      //       return <React.Suspense fallback={<Preloader/>}><DialogsContainer /></React.Suspense>
      //     } } />
      //     <Route path='/users' render={() => <UsersPage headTitle={"asdasdasdasd"} />} />
      //     <Route path='/news' render={() => <News />} />
      //     <Route path='/music' render={() => <Music />} />
      //     <Route path='/settings' render={() => <Settings />} />
      //     <Route path='/login' render={() => <Login />} />
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})


export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);
