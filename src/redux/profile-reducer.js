const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initial_state = {
    postsData: [
        { id: 1, data: "Post1", likeCount: 21 },
        { id: 2, data: "Post2", likeCount: 22 },
        { id: 3, data: "Post3", likeCount: 1 },
        { id: 4, data: "Post4", likeCount: 232 },
        { id: 5, data: "Post5", likeCount: 11 },
    ],
    newPostText: "aa11",
    profile: null
}

const profileReducer = (state = initial_state, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPostData = {
                id: 6,
                data: state.newPostText,
                likeCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPostData],
                newPostText:''
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export default profileReducer;