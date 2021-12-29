import React from 'react';
import Dialog from './Dialog/Dialog';
import style_s from './Dialogs.module.css'
import Message from './Dialog/Message/Message';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const Dialogs = (props) => {
// debugger
    let dialogsDataElements = props.dialogsData.map(dialog => <Dialog name={dialog.name} id={dialog.id} />);

    let messagesDataElements = props.dialogsData.map(message => message.messagesData.map(
        el => <Route path={'/dialogs/' + message.id} render={() => <Message message={el.message} />} />));

    let newMessageText = props.newMessageText;

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (e) => {
        let text = e.target.value;
        props.messageChange(text);
    }
    return (
        <div className={style_s.dialogs}>
            <div className={style_s.dialogs_items}>
                {dialogsDataElements}
            </div>
            <div className={style_s.messages}>
                {messagesDataElements}
                <textarea value={newMessageText} onChange={onNewMessageChange} placeholder={"Input new message"}></textarea>
                <button onClick={onSendMessageClick}>Send</button>
            </div>
        </div>
    );
}
export default Dialogs;