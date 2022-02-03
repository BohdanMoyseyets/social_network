import { usersAPI } from "../api/api";
import { updateObjInArray } from "../utils/helpers/obj-helpers";

const FOLLOW_USER = 'FOLLOW_USER';
const IGNORE_USER = 'IGNORE_USER';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_FETCHING = 'SET_FETCHING';
const SET_FOLLOWING_IN_PROGRESS = 'SET_FOLLOWING_IN_PROGRESS';

let initial_state = {
    users: [
        //     { id: 1, isFollowed: true, name: "Seb", status: "F1 driver", location: {city: "Berlin", country: "Germany"}, photoUrl:"https://e0.365dm.com/20/09/2048x1152/skysports-sebastian-vettel_5091883.jpg"},
        //     { id: 2, isFollowed: false, name: "Mark", status: "Porsche", location: {city: "Sydney", country: "Australia"}, photoUrl:"https://images.squarespace-cdn.com/content/v1/5d0825c437e0020001d7bdb6/1583715704306-PU8GZ338V9WCDIY2U4X5/ke17ZwdGBToddI8pDm48kJpGUzUhPFtokZYku1KhXAJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0oGwQPSn8VqSSM4mc7rOnoimQ5ujCOyqY7eysGfaaCU02AkWT9J5LzD3KmA8l3OZhw/Mark+Webber+-+F1SILV18js_0268.jpg"},
        //     { id: 3, isFollowed: true, name: "Lando", status: "Monster", location: {city: "London", country: "England"}, photoUrl:"https://www.f1-fansite.com/wp-content/uploads/2017/08/Lando-Norris.jpg"}
    ],
    pageSize: 8,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: []


}

const usersReducer = (state = initial_state, action) => {
    switch (action.type) {
        case FOLLOW_USER: {
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, "id", { followed: true })
            }
        }
        case IGNORE_USER: {
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, "id", { followed: false })
            }
        }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case SET_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case SET_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                isFollowingInProgress: action.isFollowingInProgress
                    ? [...state.isFollowingInProgress, action.id]
                    : state.isFollowingInProgress.filter(id => id != action.id)
            }
        }
        default:
            return state;
    }
}

export const followUser = (userId) => ({ type: FOLLOW_USER, userId });
export const ignoreUser = (userId) => ({ type: IGNORE_USER, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, count });
export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching });
export const setFollowingInProgress = (isFollowingInProgress, id) => ({ type: SET_FOLLOWING_IN_PROGRESS, isFollowingInProgress, id });


// thunk
export const getUsersRequest = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(setFetching(true));
        dispatch(setCurrentPage(currentPage));
        let data = await usersAPI.getUser(currentPage, pageSize);
        dispatch(setFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followIgnoreFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(setFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(setFollowingInProgress(false, userId));

}

export const follow = (userId) => {
    return async (dispatch) => {
        followIgnoreFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followUser);
    }
}

export const ignore = (userId) => {
    return async (dispatch) => {
        followIgnoreFlow(dispatch, userId, usersAPI.ignore.bind(usersAPI), ignoreUser);
    }
}

export default usersReducer;