import { AppStateType } from "./redux-store";

export const selectIsLogged = (state: AppStateType) => {
    return state.auth.isLogged;
}

export const selectCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login;
}
