const FOLLOW_USER = 'FOLLOW_USER';
const IGNORE_USER = 'IGNORE_USER';
const SET_USERS = 'SET_USERS';

let initial_state = {
    users: [
        //     { id: 1, isFollowed: true, name: "Seb", status: "F1 driver", location: {city: "Berlin", country: "Germany"}, photoUrl:"https://e0.365dm.com/20/09/2048x1152/skysports-sebastian-vettel_5091883.jpg"},
        //     { id: 2, isFollowed: false, name: "Mark", status: "Porsche", location: {city: "Sydney", country: "Australia"}, photoUrl:"https://images.squarespace-cdn.com/content/v1/5d0825c437e0020001d7bdb6/1583715704306-PU8GZ338V9WCDIY2U4X5/ke17ZwdGBToddI8pDm48kJpGUzUhPFtokZYku1KhXAJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0oGwQPSn8VqSSM4mc7rOnoimQ5ujCOyqY7eysGfaaCU02AkWT9J5LzD3KmA8l3OZhw/Mark+Webber+-+F1SILV18js_0268.jpg"},
        //     { id: 3, isFollowed: true, name: "Lando", status: "Monster", location: {city: "London", country: "England"}, photoUrl:"https://www.f1-fansite.com/wp-content/uploads/2017/08/Lando-Norris.jpg"}
    ]
    
}

const usersReducer = (state = initial_state, action) => {
    switch (action.type) {
        case FOLLOW_USER: {
            return {
                ...state,
                users: state.users.map(u => {
                    if( u.id === action.userId ){
                        return { ...u, isFollowed: true}
                    }
                    return u;
                })
            }
        }
        case IGNORE_USER: {
            return {
                ...state,
                users: state.users.map(u => {
                    if( u.id === action.userId ){
                        return { ...u, isFollowed: false}
                    }
                    return u;
                })
            }
        }
        case SET_USERS: {
            return { ...state, users: [...state.users, ...action.users]}
        }
        default:
            return state;
    }
}

export const followAC = (userId) => ({ type: FOLLOW_USER, userId });
export const ignoreAC = (userId) => ({ type: IGNORE_USER, userId });
export const setUsersAC = (users) => ({ type: SET_USERS, users });

export default usersReducer;