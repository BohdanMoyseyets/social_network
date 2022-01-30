import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initial_state = {
    postsData: [
        { id: 1, data: "Post1", likeCount: 21 },
        { id: 2, data: "Post2", likeCount: 22 },
        { id: 3, data: "Post3", likeCount: 1 },
        { id: 4, data: "Post4", likeCount: 232 },
        { id: 5, data: "Post5", likeCount: 11 },
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initial_state, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPostData = {
                id: 6,
                data: action.newPostText,
                likeCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPostData],
                newPostText:''
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });


export const getUserProfile = (userId) => (dispatch) =>{
    profileAPI.getProfile(userId)
    .then(response => {
        dispatch(setUserProfile(response.data));
  
      });
}

export const getStatus = (userId) => (dispatch) =>{
    profileAPI.getStatus(userId)
    .then(response => {
        dispatch(setStatus(response.data));
      });
}
export const updateStatus = (status) => (dispatch) =>{
    profileAPI.updateStatus(status)
    .then(response => {
        if(response.data.resultCode === 0){
            dispatch(setStatus(status));
        }
      });
}

export default profileReducer;