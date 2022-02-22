import React, { useEffect } from 'react';
import style_s from './Users.module.css';
import Paginator from '../common/paginator/Paginator';
import User from './User';
import { UserType } from '../../types/types';
import { Field, Form, Formik } from 'formik';
import UsersSearchForm from './UsersSearchForm';
import { FilterType, follow, getUsersRequest, ignore } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getIsFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/user-selectors';
import { useHistory } from 'react-router-dom';
import * as queryString from 'querystring'

type PropsType = {}
type QueryParamType = { term?: string, page?: string, friend?: string }

const Users: React.FC<PropsType> = (props) => {

    const currentPage = useSelector(getCurrentPage);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const users = useSelector(getUsers);
    const isFollowingInProgress = useSelector(getIsFollowingInProgress);
    const filter = useSelector(getUsersFilter);

    const dispatch = useDispatch();
    const history = useHistory();
    

    useEffect(() => {
        // const {search} = history.location;
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamType
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
        switch (parsed.friend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null }
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true }
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false }
                break;

        }

        dispatch(getUsersRequest(actualPage, pageSize, actualFilter));
    }, [])
    useEffect(() => {
        let query: QueryParamType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if(currentPage !== 1 ) query.page = String(currentPage)

        history.push({
            pathname: '/developers',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (selectedPage: number) => {
        dispatch(getUsersRequest(selectedPage, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersRequest(1, pageSize, filter));
    }
    const followA = (userId: number) => {
        dispatch(follow(userId));
    }
    const ignoreA = (userId: number) => {
        dispatch(ignore(userId));
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} />
            <div>
                {
                    users.map(u => <User key={u.id} user={u} isFollowingInProgress={isFollowingInProgress} ignore={ignoreA} follow={followA} />)
                }
            </div>

        </div>
    );
}


export default Users;