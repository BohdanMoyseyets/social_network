import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts, { MyPostDispatchPropsType, MyPostMapPropsType } from './MyPosts';

const mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  } 
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addPost: (newPostText) => { dispatch(actions.addPostActionCreator(newPostText)) }
//   }
// }
const MyPostsContainer = connect<MyPostMapPropsType, MyPostDispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: actions.addPostActionCreator})(MyPosts);


export default MyPostsContainer;