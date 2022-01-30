import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initial_state = {
    initialized: false
}

const appReducer = (state = initial_state, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: 
            return {
                ...state,
                initialized:true
            }

        default:
            return state;
    }
}

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    });
}

export default appReducer;