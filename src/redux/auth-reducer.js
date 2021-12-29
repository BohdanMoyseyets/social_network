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
                ...action.data,
                isLogged: true
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: {userId, email, login} });

export default authReducer;