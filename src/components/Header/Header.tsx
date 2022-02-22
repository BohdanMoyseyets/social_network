import React from 'react';
import { Link } from 'react-router-dom';
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import style_s from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsLogged } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';

export type MapPropsType = {}

export const Header: React.FC<MapPropsType> = (props) =>{

    const isLogged = useSelector(selectIsLogged)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }


    const {Header} = Layout
    return(
        <Header className="header">
        <Row>
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
                </Menu>
            </Col>

            {isLogged
                ?<> <Col span={1}>
                    <Avatar alt={login || ''} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                </Col>
                    <Col span={5}>
                        <Button onClick={logoutCallback}>Log out</Button>
                    </Col>
                </>
                : <Col span={6}>
                    <Button>
                        <Link to={'/login'}>Login</Link>
                    </Button>
                </Col>}

        </Row>


    </Header>
    // <header className={style_s.header}>
    //     <img src='https://www.designevo.com/images/home/3d-green-letter-o.png'/>
    //     <div className={style_s.loginBlock}>
    //         {
    //             isLogged ? <div>{login} - <button onClick={ logoutCallback}>Log out</button></div>  : <Link to={"/login"}>Login</Link>
    //         }
            
    //     </div>
    // </header>
    );
}