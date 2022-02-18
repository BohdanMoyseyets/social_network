import React from 'react';
import { NavLink } from 'react-router-dom';
import style_s from './Header.module.css'

export type MapPropsType = {
    isLogged: boolean
    login: string | null
}
export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) =>{
    return(
    <header className={style_s.header}>
        <img src='https://www.designevo.com/images/home/3d-green-letter-o.png'/>
        <div className={style_s.loginBlock}>
            {
                props.isLogged ? <div>{props.login} - <button onClick={ props.logout}>Log out</button></div>  : <NavLink to={"/login"}>Login</NavLink>
            }
            
        </div>
    </header>
    );
}
export default Header;