import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls";
import { login } from "../../redux/auth-reducer"
import { Redirect } from "react-router-dom";
import style_s from "./../common/FormsControls.module.css"

const LoginForm = (props) => {
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
            {props.error && <div className={style_s.formLoginError}> {props.error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if(props.isLogged){
        return <Redirect to={"/profile"}/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>

    )
}
const mapStateToProps = (state) =>({
    isLogged: state.auth.isLogged
})

export default connect(mapStateToProps, { login })(Login);