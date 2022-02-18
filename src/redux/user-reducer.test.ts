import usersReducer, { actions, InitialStateType } from "./users-reducer";
let state: InitialStateType;

beforeEach(()=>{
    state = {
       users: [
           {id: 0, name: "name 0", followed: false, photos:{small: null, large: null}, status: "status 0"},
           {id: 1, name: "name 1", followed: false, photos:{small: null, large: null}, status: "status 1"},
           {id: 2, name: "name 2", followed: true, photos:{small: null, large: null}, status: "status 2"},
           {id: 3, name: "name 3", followed: true, photos:{small: null, large: null}, status: "status 3"},
       ],
       pageSize: 8,
       totalUsersCount: 0,
       currentPage: 1,
       isFetching: false,
       isFollowingInProgress: []
   };
})


test('follow success', () => {

    const newState = usersReducer(state, actions.followUser(1))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})

test('ignore success', () => {

    const newState = usersReducer(state, actions.ignoreUser(3))

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
})