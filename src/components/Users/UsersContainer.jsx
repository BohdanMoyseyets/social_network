import React from 'react';
import { connect } from 'react-redux';
import { follow, ignore, getUsersRequest } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader';
import { compose } from 'redux';
import { getCurrentPage, getIsFetching, getIsFollowingInProgress, getPageSize, getTotalUsersCount, getUsers } from '../../redux/user-selectors';

class UsersContainerAPI extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }
    onPageChanged = (selectedPage) => {
        const {pageSize} = this.props;
        this.props.getUsers(selectedPage, pageSize);

    }


    render() {
        return <>
            {this.props.isFetching ? <Preloader /> :null} <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                isFollowingInProgress={this.props.isFollowingInProgress} 
                ignore={this.props.ignore}
                follow={this.props.follow}
                
            />

        </>
    }
}

// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         isFollowingInProgress: state.usersPage.isFollowingInProgress
//     }
// }
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state)
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

export default compose(connect(mapStateToProps, { follow, ignore, getUsers: getUsersRequest }))(UsersContainerAPI)
// export default connect(mapStateToProps,
//     {
//         follow,
//         ignore,
//         setCurrentPage,
//         getUsersRequest
//     })(UsersContainerAPI);