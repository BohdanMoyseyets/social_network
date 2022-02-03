import React from 'react';
import { NavLink } from 'react-router-dom';
import style_s from './Dialog.module.css'

const Dialog = (props)=>{
    
    return(
    <div className={style_s.dialog+ ' ' + style_s.active}>
        <NavLink to={"/dialogs/" + props.id} activeClassName={style_s.active}>{props.name}</NavLink>
    </div>
    );
}

export default Dialog;