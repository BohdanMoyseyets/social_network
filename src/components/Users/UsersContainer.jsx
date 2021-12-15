import React from 'react';
import { connect } from 'react-redux';
import { followAC, ignoreAC, setCurrentPageAC, setUsersAC, setTotalUsersCountAC } from '../../redux/users-reducer';
import Users from './Users';
import * as axios from "axios";

class UsersContainerAPI extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount)
        });
    }
    onPageChanged = (selectedPage) => {
        this.props.setCurrentPage(selectedPage);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${selectedPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
        });

    }


    render() {
        return <Users totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            ignoreUser={this.props.ignoreUser}
            followUser={this.props.followUser}
        />
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        followUser: (userId) => { dispatch(followAC(userId)) },
        ignoreUser: (userId) => { dispatch(ignoreAC(userId)) },
        setUsers: (users) => { dispatch(setUsersAC(users)) },
        setCurrentPage: (pageNumber) => { dispatch(setCurrentPageAC(pageNumber)) },
        setTotalUsersCount: (count) => { dispatch(setTotalUsersCountAC(count)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainerAPI);