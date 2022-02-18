import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/dialogs-reducer';
import { AppStateType } from '../../redux/redux-store';
import Dialogs from './Dialogs';


const mapStateToProps = (state:AppStateType) => {
    return {
        newMessageText: state.dialogsPage.newTextMessage,
        dialogsData: state.dialogsPage.dialogsData
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         sendMessage: (newMessageText) => {
//             let id = window.location.pathname[9];
//             dispatch(actions.sendMessageCreator(newMessageText));
//         }
//     }
// }
// let AuthRedirectComponent = withAuthRedirect(Dialogs);
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default compose(connect(mapStateToProps, {...actions}),withAuthRedirect)(Dialogs) as React.ComponentType;
// export default DialogsContainer;