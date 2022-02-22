import { createSelector } from "reselect"
import { UserType } from "../types/types";
import { AppStateType } from "./redux-store";

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
}

export const getUsers = createSelector(getUsersSelector, (users: Array<UserType>) => {
    return users.filter(u => true);
}) 

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getIsFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.isFollowingInProgress;
}

export const getUsersFilter = (state: AppStateType) => {
    return state.usersPage.filter;
}