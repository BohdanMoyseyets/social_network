import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import PersonInfo from './PersonInfo/PersonInfo';
import style_s from './Profile.module.css'

const Profile = (props) => {
  return (
    <div>
      <PersonInfo profile={props.profile} saveProfile={props.saveProfile} savePhoto={props.savePhoto} isOwner={props.isOwner} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer />
    </div>
  );
}
export default Profile;