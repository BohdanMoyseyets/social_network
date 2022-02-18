import React from 'react';
import style_s from './Message.module.css'

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = (props)=>{
    return <div className={style_s.message}>{props.message}</div>
}

export default Message;