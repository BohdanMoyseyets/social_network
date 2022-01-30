import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initial_state = {
    userId: null,
    email: null,
    login: null,
    isLogged: false
}

const authReducer = (state = initial_state, action) => {
    switch (action.type) {
        case SET_USER_DATA: 
            return {
                ...state,
                ...action.data
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isLogged) => ({ type: SET_USER_DATA, data: {userId, email, login, isLogged} });

export const getAuthUserData = () => (dispatch) => {
   return authAPI.me().then(response => {
        if(response.data.resultCode === 0){
            let {id, email, login} = response.data.data
            dispatch(setAuthUserData( id, email, login, true));
        }
    });
}
export const login = (email, password, rememberMe) => (dispatch) => {



    authAPI.login(email, password, rememberMe).then(response => {
        if(response.data.resultCode === 0){
            dispatch(getAuthUserData());
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error";
            dispatch(stopSubmit("login", { _error: message}));
        }
    });
}
export const logout = () => (dispatch) => {
    authAPI.logout().then(response => {
        if(response.data.resultCode === 0){
            dispatch(setAuthUserData( null, null, null, false));
        }
    });
}

export default authReducer;