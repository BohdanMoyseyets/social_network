import React from 'react';
import style_s from './PersonInfo.module.css'

const PersonInfo = () =>{
    return(
    <div>
      <div className={style_s.background}>
        <img src="https://i.imgur.com/RRUe0Mo.png"/>
      </div>
      <div className={style_s.person_info}>
        <img src="https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg"/>
        <div>Bohdan Moyseyets</div>
      </div>
    </div>
    );
}
export default PersonInfo;