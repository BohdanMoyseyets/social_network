import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { APIResponseType, usersAPI } from "../api/api";
import { PhotosType, UserType } from "../types/types";
import { updateObjInArray } from "../utils/helpers/obj-helpers";
import { AppStateType, BaseThunkType, InferActionsType } from "./redux-store";

// const FOLLOW_USER = 'FOLLOW_USER';
// const IGNORE_USER = 'IGNORE_USER';
// const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
// const SET_FETCHING = 'SET_FETCHING';
// const SET_FOLLOWING_IN_PROGRESS = 'SET_FOLLOWING_IN_PROGRESS';

let initial_state = {
    users: [] as Array<UserType>,
    pageSize: 8,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: [] as Array<number>
}

export type InitialStateType = typeof initial_state;

const usersReducer = (state = initial_state, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW_USER': {
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, "id", { followed: true })
            }
        }
        case 'IGNORE_USER': {
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, "id", { followed: false })
            }
        }
        case 'SET_USERS': {
            return { ...state, users: action.users }
        }
        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.count }
        }
        case 'SET_FETCHING': {
            return { ...state, isFetching: action.isFetching }
        }
        case 'SET_FOLLOWING_IN_PROGRESS': {
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

type ActionsType = InferActionsType<typeof actions>
export const actions = {
    followUser: (userId: number) => ({ type: 'FOLLOW_USER', userId } as const),
    ignoreUser: (userId: number) => ({ type: 'IGNORE_USER', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (count: number) => ({ type: 'SET_TOTAL_USERS_COUNT', count } as const),
    setFetching: (isFetching: boolean) => ({ type: 'SET_FETCHING', isFetching } as const),
    setFollowingInProgress: (isFollowingInProgress: boolean, id: number) => ({ type: 'SET_FOLLOWING_IN_PROGRESS', isFollowingInProgress, id } as const)
}

// export const followUser = (userId: number) => ({ type: FOLLOW_USER, userId });
// export const ignoreUser = (userId: number) => ({ type: IGNORE_USER, userId });
// export const setUsers = (users: Array<UserType>) => ({ type: SET_USERS, users });
// export const setCurrentPage = (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage });
// export const setTotalUsersCount = (count: number) => ({ type: SET_TOTAL_USERS_COUNT, count });
// export const setFetching = (isFetching: boolean) => ({ type: SET_FETCHING, isFetching });
// export const setFollowingInProgress = (isFollowingInProgress: boolean, id: number) => ({ type: SET_FOLLOWING_IN_PROGRESS, isFollowingInProgress, id });

type DispatchType = Dispatch<ActionsType>;
type ThunkType = BaseThunkType<ActionsType>;


// thunk
export const getUsersRequest = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(actions.setFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        let data = await usersAPI.getUser(currentPage, pageSize);
        dispatch(actions.setFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}

const followIgnoreFlow = async (dispatch: DispatchType, userId: number, apiMethod: ( userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => ActionsType) => {
    dispatch(actions.setFollowingInProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode == 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.setFollowingInProgress(false, userId));

}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
       await followIgnoreFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followUser);
    }
}

export const ignore = (userId: number): ThunkType => {
    return async (dispatch) => {
        await followIgnoreFlow(dispatch, userId, usersAPI.ignore.bind(usersAPI), actions.ignoreUser);
    }
}

export default usersReducer;