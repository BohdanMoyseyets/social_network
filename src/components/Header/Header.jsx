import React from 'react';
import { NavLink } from 'react-router-dom';
import style_s from './Header.module.css'

const Header = (props) =>{
    return(
    <header className={style_s.header}>
        <img src='https://www.designevo.com/images/home/3d-green-letter-o.png'/>
        <div className={style_s.loginBlock}>
            {
                props.isLogged ? props.login : <NavLink to={"/login"}>Login</NavLink>
            }
            
        </div>
    </header>
    );
}
export default Header;