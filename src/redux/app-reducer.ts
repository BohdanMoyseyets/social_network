import { getAuthUserData } from "./auth-reducer";
import { InferActionsType } from "./redux-store";

// const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initial_state = {
    initialized: false
}

export type InitialStateType = typeof initial_state

type ActionsType = InferActionsType<typeof actions>

const appReducer = (state = initial_state, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "INITIALIZED_SUCCESS": 
            return {
                ...state,
                initialized:true
            }

        default:
            return state;
    }
}



export const actions = {
    initializedSuccess: ()=> ({ type: "INITIALIZED_SUCCESS" } as const)
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    });
}

export default appReducer;