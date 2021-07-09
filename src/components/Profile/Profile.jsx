import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import PersonInfo from './PersonInfo/PersonInfo';
import style_s from './Profile.module.css'

const Profile = (props) =>{
    return(
    <div>
      <PersonInfo />
      <MyPostsContainer store={props.store} />
    </div>
    );
}
export default Profile;