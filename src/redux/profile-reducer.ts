import { FormAction, stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
import { PhotosType, PostsDataType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionsType } from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';



let initial_state = {
    postsData: [
        { id: 1, data: "Post1", likeCount: 21 },
        { id: 2, data: "Post2", likeCount: 22 },
        { id: 3, data: "Post3", likeCount: 1 },
        { id: 4, data: "Post4", likeCount: 232 },
        { id: 5, data: "Post5", likeCount: 11 },
    ] as Array<PostsDataType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
}

export type InitialStateType = typeof initial_state;
type ActionsType = InferActionsType<typeof actions>

type ThunkType = BaseThunkType<ActionsType | FormAction>;

const profileReducer = (state = initial_state, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "ADD_POST": {
            let newPostData = {
                id: 6,
                data: action.newPostText,
                likeCount: 0
            };
            return {
                ...state,
                postsData: [...state.postsData, newPostData],
                newPostText: ''
            };
        }
        case "SET_USER_PROFILE": {
            return {
                ...state,
                profile: action.profile
            };
        }
        case "SET_STATUS": {
            return {
                ...state,
                status: action.status
            };
        }
        case "DELETE_POST": {
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id != action.postID)
            };
        }
        case "SAVE_PHOTO_SUCCESS": {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            };
        }
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: "ADD_POST", newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({ type: "SET_USER_PROFILE", profile} as const),
    setStatus: (status: string) => ({ type: "SET_STATUS", status } as const),
    deletePost: (postID: number) => ({ type: "DELETE_POST", postID } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: "SAVE_PHOTO_SUCCESS", photos } as const)
}


export const getUserProfile = (userId: number):ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {
        //
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        // dispatch(stopSubmit("editForm", {"contacts": {"facebook": response.data.messages[0]}}))
        dispatch(stopSubmit("editForm", { _error: data.messages[0] }));
        return Promise.reject(data.messages[0]);
    }
}

export default profileReducer;