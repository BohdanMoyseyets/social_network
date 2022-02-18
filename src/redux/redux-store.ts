import thunk, { ThunkAction } from "redux-thunk";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import { Action } from "redux";
const { createStore, combineReducers, applyMiddleware } = require("redux");

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

// type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

// export type InferActionsType<T extends {[key: string]:(...args: any[]) => any}> = ReturnType<PropertiesType<T>>
export type InferActionsType<T> = T extends {[key: string]:(...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const store = createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore
window.store = store;

export default store;