import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../redux/redux-store';

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isLogged: state.auth.isLogged
})
type MapPropsType = {
    isLogged: boolean
}
type DispatchPropsType = {}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isLogged, ...restProps} = props

        if (!isLogged) return <Redirect to={"/login"} />;

        return <WrappedComponent {...restProps as unknown as WCP} />
    }
    let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect, {})
        (RedirectComponent);
    return ConnectedAuthRedirectComponent;
}