const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

let initial_state = {
    dialogsData: [
        {
            id: 1, name: "Ruslan", messagesData: [
                { id: 1, message: "Hello1" },
                { id: 2, message: "How are you?1" },
                { id: 3, message: "Blalalalalalalala1" },
                { id: 4, message: "lol1" },
                { id: 5, message: "bye1" },
            ]
        },
        {
            id: 2, name: "Andriy", messagesData: [
                { id: 1, message: "Hello2" },
                { id: 2, message: "How are you?2" },
                { id: 3, message: "Blalalalalalalala2" },
                { id: 4, message: "lol2" },
                { id: 5, message: "bye2" },
            ]
        },
        {
            id: 3, name: "Petro", messagesData: [
                { id: 1, message: "Hello3" },
                { id: 2, message: "How are you?3" },
                { id: 3, message: "Blalalalalalalala3" },
                { id: 4, message: "lol3" },
                { id: 5, message: "bye3" },
            ]
        },
        {
            id: 4, name: "Vasiy", messagesData: [
                { id: 1, message: "Hello4" },
                { id: 2, message: "How are you?4" },
                { id: 3, message: "Blalalalalalalala4" },
                { id: 4, message: "lol4" },
                { id: 5, message: "bye4" },
            ]
        },
        {
            id: 5, name: "Valera", messagesData: [
                { id: 1, message: "Hello5" },
                { id: 2, message: "How are you?5" },
                { id: 3, message: "Blalalalalalalala5" },
                { id: 4, message: "lol5" },
                { id: 5, message: "bye5" },
            ]
        },
    ],
    newTextMessage: ""
}

const dialogsReducer = (state = initial_state, action) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessageData = {
                id: 6,
                message: state.newTextMessage
            };
            let stateCopy = { ...state };
            stateCopy.dialogsData = [...state.dialogsData]
            stateCopy.dialogsData[action.dialogID].messagesData = [...state.dialogsData[action.dialogID].messagesData];
            stateCopy.dialogsData[action.dialogID].messagesData.push(newMessageData);
            stateCopy.newTextMessage = '';
            return stateCopy;
        }
        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newTextMessage: action.newText
            };
        }
        default:
            return state;
    }

}

export const sendMessageCreator = (id) => ({ type: SEND_MESSAGE, dialogID: id });
export const updateNewMessageTextCreator = (text) => ({ type: UPDATE_NEW_MESSAGE_TEXT, newText: text });

export default dialogsReducer;