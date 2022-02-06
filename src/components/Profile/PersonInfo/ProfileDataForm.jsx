import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../../utils/validators/validators';
import { Input, Textarea } from '../../common/FormsControls';
import style_s from './PersonInfo.module.css';

const ProfileDataForm = ({ handleSubmit, profile, error}) => {
  return (
    <form onSubmit={handleSubmit}><div><button >save</button></div>
    {error && <div className={style_s.formLoginError}> {error}</div>}
      <div>
        <b> My full name</b>: <Field placeholder={"Full name"} name={"fullName"} component={Input} validate={[required]}/>
      </div>
      <div>
        <b> My full name</b>: <Field placeholder={"About me"} name={"aboutMe"} component={Textarea} validate={[required]}/>
      </div>
      <div>
        <b>Looking for a job</b>: <Field placeholder={"Looking for a job"} name={"lookingForAJob"} component={Input} type={"checkbox"}/>
      </div>
      <div>
        <b>My skills description</b>: <Field placeholder={"my skills"} name={"lookingForAJobDescription"} component={Textarea} validate={[required]}/>
      </div>
      <div>
        <div>
          <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
          return <div className={style_s.contact} >
            <b>{key}</b>: {<Field placeholder={key} name={"contacts." + key} component={Input}/>}
          </div>})}
        </div>
      </div>
    </form>
  );
}

const ProfileDataFormReduxForm = reduxForm({ form: 'editForm' })(ProfileDataForm)

export default ProfileDataFormReduxForm;