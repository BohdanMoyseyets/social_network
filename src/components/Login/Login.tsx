import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
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

type LoginFormValuesType = {
    captcha: any
    email:string
    password: string
    rememberMe: boolean
}

export const Login: React.FC = (props) => {

    const captchaUrl = useSelector((state:AppStateType) => state.auth.captchaUrl)
    const isLogged = useSelector((state:AppStateType) => state.auth.isLogged)

    const dispatch = useDispatch()


    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    }

    if(isLogged){
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>

    )
}