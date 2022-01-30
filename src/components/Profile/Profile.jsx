import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import PersonInfo from './PersonInfo/PersonInfo';
import style_s from './Profile.module.css'

const Profile = (props) => {
  return (
    <div>
      <PersonInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer store={props.store} />
    </div>
  );
}
export default Profile;