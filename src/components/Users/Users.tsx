import React from 'react';
import style_s from './Users.module.css';
import Paginator from '../common/paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    isFollowingInProgress:Array<number>
    ignore: (userId: number)=> void
    follow: (userId: number)=> void
}

const Users: React.FC<PropsType> = (props) => {
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