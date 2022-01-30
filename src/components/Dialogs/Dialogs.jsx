import React from 'react';
import Dialog from './Dialog/Dialog';
import style_s from './Dialogs.module.css'
import Message from './Dialog/Message/Message';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const Dialogs = (props) => {
    // debugger
    let dialogsDataElements = props.dialogsData.map(dialog => <Dialog name={dialog.name} id={dialog.id} />);

    let messagesDataElements = props.dialogsData.map(message => message.messagesData.map(
        el => <Route path={'/dialogs/' + message.id} render={() => <Message message={el.message} />} />));

   
    let addNewMessage = (values) =>{
        props.sendMessage(values.newMessageText);
    }
    return (
        <div className={style_s.dialogs}>
            <div className={style_s.dialogs_items}>
                {dialogsDataElements}
            </div>
            <div className={style_s.messages}>
                {messagesDataElements}
                <AddMessageFormRedux onSubmit={addNewMessage}/>

            </div>
        </div>
    );
}
const maxLength30 = maxLengthCreator(30);
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} placeholder={"Input new message"} name="newMessageText" validate={[required, maxLength30]}/>
            <button>Send</button>
        </form>
    )
}
const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);

export default Dialogs;