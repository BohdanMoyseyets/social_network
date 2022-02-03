import React from 'react';
import style_s from './Users.module.css';
import Paginator from '../common/paginator/Paginator';
import User from './User';


const Users = (props) => {
    return (
        <div>
            <Paginator currentPage={props.currentPage} totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} onPageChanged={props.onPageChanged} />
            {
                props.users.map(u => <User key={u.id} user={u} isFollowingInProgress={props.isFollowingInProgress} ignore={props.ignore} follow={props.follow} />)
            }

        </div>
    );
}
export default Users;