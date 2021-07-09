import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import style_s from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = (props) =>{
  let postsDataElements = props.postsData.map(post => <Post data={post.data} likeCount={post.likeCount}/>);
  
  let newPostElement = React.createRef();
  
  let onAddPost = ()=>{
    props.addPost();
  };
  
  let onChangeText = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

    return(
      <div>
        <h3>Posts</h3>
        <div>
          <div>New Post</div>
          <div>
            <textarea onChange={onChangeText} ref={newPostElement} value={props.newPostText} />
          </div>
          <div>
            <button onClick={onAddPost}>add post</button>
          </div>
        </div>
        {postsDataElements}
      </div>
    );
}
export default MyPosts;