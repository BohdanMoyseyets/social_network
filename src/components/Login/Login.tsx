import React from "react";
import { connect } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls";
import { login } from "../../redux/auth-reducer"
import { Redirect } from "react-router-dom";
import style_s from "./../common/FormsControls.module.css"
import { AppStateType } from "../../redux/redux-store";

type LoginFormOwnValues = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnValues> & LoginFormOwnValues > = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"email"} name={"email"} component={Input} validate={[required]}/>
            </div>
            <div>
                <Field placeholder={"password"} name={"password"} component={Input} validate={[required]} type="password"/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={"input"}/> remember me
            </div>
            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl &&  <Field placeholder={"Input numbers from image"} name={"captcha"} component={Input} validate={[required]}/>}
            {props.error && <div className={style_s.formLoginError}> {props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnValues>({ form: 'login' })(LoginForm)

type MapStateToPropsType = {
    captchaUrl: string | null
    isLogged: boolean

}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: any)=> void

}

type LoginFormValuesType = {
    captcha: any
    email:string
    password: string
    rememberMe: boolean
}

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if(props.isLogged){
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>

    )
}
const mapStateToProps = (state: AppStateType) =>({
    captchaUrl: state.auth.captchaUrl,
    isLogged: state.auth.isLogged
})

export default connect(mapStateToProps, { login })(Login);