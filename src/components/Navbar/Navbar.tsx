import React from 'react';
import { NavLink } from 'react-router-dom';
import style_s from './Navbar.module.css'

const Navbar: React.FC = () =>{
    return(
    <nav className={style_s.nav}>
        <div className={style_s.item}>
          <NavLink to="/profile" activeClassName={style_s.active}>Profile</NavLink>
        </div>
        <div className={style_s.item}>
          <NavLink to="/dialogs" activeClassName={style_s.active}>Messages</NavLink>
        </div>
        <div className={style_s.item}>
          <NavLink to="/users" activeClassName={style_s.active}>Users</NavLink>
        </div>
        <div className={style_s.item}>
          <NavLink to="/news" activeClassName={style_s.active}>News</NavLink>
        </div>
        <div className={style_s.item}>
          <NavLink to="/music" activeClassName={style_s.active}>Music</NavLink>
        </div>
        <div className={style_s.item}>
          <NavLink to="/settings" activeClassName={style_s.active}>Settings</NavLink>
        </div>
    </nav>
    );
}
export default Navbar;