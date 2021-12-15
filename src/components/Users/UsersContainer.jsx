import React from 'react';
import { connect } from 'react-redux';
import { followAC, ignoreAC, setCurrentPageAC, setUsersAC, setTotalUsersCountAC, setFetchingAC } from '../../redux/users-reducer';
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
            {this.props.isFetching ? <img src={preloader} style={{backgroundColor: '#fff'}} /> : <Users totalUsersCount={this.props.totalUsersCount}
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

let mapDispatchToProps = (dispatch) => {
    return {
        followUser: (userId) => { dispatch(followAC(userId)) },
        ignoreUser: (userId) => { dispatch(ignoreAC(userId)) },
        setUsers: (users) => { dispatch(setUsersAC(users)) },
        setCurrentPage: (pageNumber) => { dispatch(setCurrentPageAC(pageNumber)) },
        setTotalUsersCount: (count) => { dispatch(setTotalUsersCountAC(count)) },
        setFetching: (isFetching) => { dispatch(setFetchingAC(isFetching)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainerAPI);