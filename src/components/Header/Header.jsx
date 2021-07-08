import React from 'react';
import style_s from './Header.module.css'

const Header = (props) =>{
    return(
    <header className={style_s.header}>
        <img src='https://www.designevo.com/images/home/3d-green-letter-o.png'/>
    </header>
    );
}
export default Header;