import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { PostsDataType } from '../../../types/types';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls';
import style_s from './MyPosts.module.css'
import Post from './Post/Post';


type PropsType = {

}

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={Textarea} name="newPostText" validate={[required, maxLength10]}/>
      <div>
        <button>add post</button>
      </div>
    </form>
  )
}
const maxLength10 = maxLengthCreator(10);



const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: "addNewPostForm"})(AddNewPostForm);

type AddPostFormValuesType = {
  newPostText: string
}

export type MyPostMapPropsType = {
  postsData: Array<PostsDataType>
}
export type MyPostDispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MyPostMapPropsType & MyPostDispatchPropsType> = (props) => {

  console.log("hey");
  let postsDataElements = props.postsData.map(post => <Post data={post.data} likeCount={post.likeCount} />);

  let onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  };
  

  return (
    <div>
      <h3>Posts</h3>
      <div>
        <div>New Post</div>
        <AddNewPostFormRedux onSubmit={onAddPost}/>
      </div>
      {postsDataElements}
    </div>
  );
}
export default MyPosts;