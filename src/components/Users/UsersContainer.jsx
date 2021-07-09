import React from 'react';
import { connect } from 'react-redux';
import { followAC, ignoreAC, setUsersAC } from '../../redux/users-reducer';
import Users from './Users';

let mapStateToProps = (state) =>{
    return {
        users: state.usersPage.users
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        followUser: (userId) => { dispatch(followAC(userId)) },
        ignoreUser: (userId) => { dispatch(ignoreAC(userId)) },
        setUsers: (users) => { dispatch(setUsersAC(users))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Users);