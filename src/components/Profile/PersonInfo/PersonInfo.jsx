import React from 'react';
import Preloader from '../../common/Preloader';
import style_s from './PersonInfo.module.css'
import ProfileStatus from './ProfileStatus';

const PersonInfo = (props) =>{
  if(!props.profile){
    return <Preloader/>
  }
    return(
    <div>
      {/* <div className={style_s.background}>
        <img src="https://i.imgur.com/RRUe0Mo.png"/>
      </div> */}

      <div className={style_s.person_info}>
        {/* <img src="https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg"/> */}
        <img src={props.profile.photos.large}/>
        <div>Bohdan Moyseyets</div>
        <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
      </div>
    </div>
    );
}
export default PersonInfo;