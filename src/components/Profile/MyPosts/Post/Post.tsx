import React from 'react';
import { PostsDataType } from '../../../../types/types';
import style_s from './Post.module.css'

type PropsType = {
  data: string
  likeCount: number
}

const Post: React.FC<PropsType> = (props) =>{
    return(
        <div className={style_s.item}>
          <img src='https://hornews.com/images/news_large/c1d4b2b8ec608ea72764c5678816d5c9.jpg'/>
          <span>{props.data}</span>
          <div>like <span>{props.likeCount}</span></div>
        </div>
    );
}
export default Post;