import React from 'react';
import { connect, useSelector } from 'react-redux';
import { follow, ignore, getUsersRequest, FilterType } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader';
import { compose } from 'redux';
import { getCurrentPage, getIsFetching, getIsFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/user-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type UsersPagePropsType = {
    headTitle: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return<>
    <h2>{props.headTitle}</h2>
        {isFetching ? <Preloader /> :null} <Users/>
    </>
}
