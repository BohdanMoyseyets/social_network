import React, {useState} from 'react';
import Preloader from '../../common/Preloader';
import style_s from './PersonInfo.module.css'
import ProfileStatus from './ProfileStatus';
import ProfileStatusHooks from './ProfileStatusHooks';
import userPhoto from './../../../assets/images/profile_img.png';
import ProfileDataForm from './ProfileDataForm';
// 'assets/images/profile_img.png';

const PersonInfo = (props) => {
  let [editMode, setEditMode] = useState(false);
  if (!props.profile) {
    return <Preloader />
  }
  
  const activeEditMode = () => {
    setEditMode(true);
  }

  const onPhotoUpload = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  }
  const onSubmit = (formData) => {
    props.saveProfile(formData).then(
      ()=> {
      setEditMode(false);
    });
  }

  return (
    <div>
      <div className={style_s.person_info}>
        <img src={props.profile.photos.large || userPhoto} />
        {props.isOwner && <input onChange={onPhotoUpload} type='file' />}
        <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus} />
        {editMode 
          ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> 
          : <ProfileData profile={props.profile} gotoEditMode={activeEditMode} isOwner={props.isOwner}/>}
      </div>
    </div>
  );
}

const SocialMediaContact = ({name, value}) =>{
  return <div className={style_s.contact}>
    <b>{name}</b>:{value}
  </div>
}



const ProfileData = ({profile, gotoEditMode, isOwner}) => {
  return <div>
    {isOwner && <div><button onClick={gotoEditMode}>edit</button></div>}
    <div>
      <b> My full name</b>: {profile.fullName}
    </div>
    <div>
      <b>About Me</b>: {profile.aboutMe}
    </div>
    <div>
      <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
    </div>
    <div>
      <b>My skills description</b>: {profile.lookingForAJobDescription}
    </div>
    
    <div>
      <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key =>  <SocialMediaContact key={key} name={key} value={profile.contacts[key]}/>)}
        </div>

      
    </div>

  </div>
}


export default PersonInfo;