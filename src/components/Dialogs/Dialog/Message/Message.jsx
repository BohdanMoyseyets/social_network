import React from 'react';
import style_s from './Message.module.css'

const Message = (props)=>{
    return <div className={style_s.message}>{props.message}</div>
}

export default Message;