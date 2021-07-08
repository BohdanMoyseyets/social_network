import React from 'react';
import { connect } from 'react-redux';
import { sendMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';


const mapStateToProps = (state) => {
    return {
        newMessageText: state.dialogsPage.newTextMessage,
        dialogsData: state.dialogsPage.dialogsData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            let id = window.location.pathname[9];
            dispatch(sendMessageCreator(id - 1));
        },
        messageChange: (text) => { dispatch(updateNewMessageTextCreator(text)); }
    }
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;