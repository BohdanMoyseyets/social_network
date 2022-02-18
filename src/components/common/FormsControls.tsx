import React, { ReactNode } from "react";
import { WrappedFieldProps } from "redux-form";
import { WrappedFieldMetaProps } from "redux-form/lib/Field";
import style_s from './FormsControls.module.css';

type FormControlPropsType = {
    meta: WrappedFieldMetaProps

}


const FormControl: React.FC<FormControlPropsType> = ({ meta: {touched, error}, children}) =>{
    const hasError = touched && error;
    return (
        <div className={style_s.formControl + " " + (hasError ? style_s.error : "")}>
            <div>
                {children}
            </div>
            { hasError && <span>{error}</span>}

        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) =>{
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) =>{
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}
