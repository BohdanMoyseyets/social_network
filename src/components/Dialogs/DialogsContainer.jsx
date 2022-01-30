import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { sendMessageCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';


const mapStateToProps = (state) => {
    return {
        newMessageText: state.dialogsPage.newTextMessage,
        dialogsData: state.dialogsPage.dialogsData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageText) => {
            let id = window.location.pathname[9];
            dispatch(sendMessageCreator((id - 1), newMessageText));
        }
    }
}
// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose(connect(mapStateToProps, mapDispatchToProps),withAuthRedirect)(Dialogs);
// export default DialogsContainer;