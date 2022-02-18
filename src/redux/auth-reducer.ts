import { FormAction, stopSubmit } from "redux-form";
import { authAPI, captchaAPI, ResultCodeEnum, ResultCodeWithCaptchaEnum } from "../api/api";
import { BaseThunkType, InferActionsType } from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initial_state = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isLogged: false,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initial_state
type ActionsType = InferActionsType<typeof actions>

type ThunkType = BaseThunkType<ActionsType | FormAction>;

const authReducer = (state = initial_state, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.data
            }
        case "GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.data
            }

        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isLogged: boolean) => ({ 
        type: "SET_USER_DATA",
        data: { userId, email, login, isLogged } 
    } as const),
    setCaptchaUrl:(captchaUrl: string) => ({ 
        type: "GET_CAPTCHA_URL_SUCCESS", 
        data: { captchaUrl } 
    } as const)
}


export const getAuthUserData = (): ThunkType  => async (dispatch) => {
    let dataResponse = await authAPI.me();
    if (dataResponse.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = dataResponse.data
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {

    let responseData = await authAPI.login(email, password, rememberMe, captcha);
    if (responseData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (responseData.resultCode === ResultCodeWithCaptchaEnum.Captcha) {
            dispatch(getCaptchaUrl());
        }
        let message = responseData.messages.length > 0 ? responseData.messages[0] : "some error";
        dispatch(stopSubmit("login", { _error: message }));
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }

}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await captchaAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.setCaptchaUrl(captchaUrl));
}

export default authReducer;