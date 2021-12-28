import React from 'react';
import { connect } from 'react-redux';
import { followUser, ignoreUser, setCurrentPage, setUsers, setTotalUsersCount, setFetching } from '../../redux/users-reducer';
import Users from './Users';
import * as axios from "axios";
import preloader from '../../assets/images/loader.gif';

class UsersContainerAPI extends React.Component {

    componentDidMount() {
        this.props.setFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setFetching(false);
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount)
        });
    }
    onPageChanged = (selectedPage) => {
        this.props.setCurrentPage(selectedPage);
        this.props.setFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${selectedPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setFetching(false);
            this.props.setUsers(response.data.items)
        });

    }


    render() {
        return <>
            {this.props.isFetching ? <img src={preloader} style={{ backgroundColor: '#aaa' }} /> : <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                ignoreUser={this.props.ignoreUser}
                followUser={this.props.followUser}
            />}

        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         followUser: (userId) => { dispatch(followUser(userId)) },
//         ignoreUser: (userId) => { dispatch(ignoreUser(userId)) },
//         setUsers: (users) => { dispatch(setUsers(users)) },
//         setCurrentPage: (pageNumber) => { dispatch(setCurrentPage(pageNumber)) },
//         setTotalUsersCount: (count) => { dispatch(setTotalUsersCount(count)) },
//         setFetching: (isFetching) => { dispatch(setFetching(isFetching)) }
//     }
// }


export default connect(mapStateToProps,
    {
        followUser,
        ignoreUser,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        setFetching
    })(UsersContainerAPI);