import { BaseThunkType, InferActionsType } from "./redux-store";

const SEND_MESSAGE = 'SEND_MESSAGE';

export type DialogsDataType = {
    id: number
    name: string
    messagesData: Array<MessagesDataType>
}
type MessagesDataType = {
    id: number
    message: string
}


let initial_state = {
    dialogsData: [
        {
            id: 1, name: "Ruslan", messagesData: [
                { id: 1, message: "Hello1" },
                { id: 2, message: "How are you?1" },
                { id: 3, message: "Blalalalalalalala1" },
                { id: 4, message: "lol1" },
                { id: 5, message: "bye1" },
            ] as Array<MessagesDataType>
        },
        {
            id: 2, name: "Andriy", messagesData: [
                { id: 1, message: "Hello2" },
                { id: 2, message: "How are you?2" },
                { id: 3, message: "Blalalalalalalala2" },
                { id: 4, message: "lol2" },
                { id: 5, message: "bye2" },
            ] as Array<MessagesDataType>
        },
        {
            id: 3, name: "Petro", messagesData: [
                { id: 1, message: "Hello3" },
                { id: 2, message: "How are you?3" },
                { id: 3, message: "Blalalalalalalala3" },
                { id: 4, message: "lol3" },
                { id: 5, message: "bye3" },
            ] as Array<MessagesDataType>
        },
        {
            id: 4, name: "Vasiy", messagesData: [
                { id: 1, message: "Hello4" },
                { id: 2, message: "How are you?4" },
                { id: 3, message: "Blalalalalalalala4" },
                { id: 4, message: "lol4" },
                { id: 5, message: "bye4" },
            ] as Array<MessagesDataType>
        },
        {
            id: 5, name: "Valera", messagesData: [
                { id: 1, message: "Hello5" },
                { id: 2, message: "How are you?5" },
                { id: 3, message: "Blalalalalalalala5" },
                { id: 4, message: "lol5" },
                { id: 5, message: "bye5" },
            ] as Array<MessagesDataType>
        },
    ] as Array<DialogsDataType>
}

export type InitialStateType = typeof initial_state;
type ActionsType = InferActionsType<typeof actions>

const dialogsReducer = (state = initial_state, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SEND_MESSAGE": {
            let newMessageData = {
                id: 6,
                message: action.newMessageText
            };
            let stateCopy = { ...state };
            let dialId =  +window.location.pathname[9]-1;
            stateCopy.dialogsData = [...state.dialogsData]
            stateCopy.dialogsData[dialId].messagesData = [...state.dialogsData[dialId].messagesData];
            stateCopy.dialogsData[dialId].messagesData.push(newMessageData);
            // action.newTextMessage = '';
            return stateCopy;
        }
        default:
            return state;
    }

}

export const actions = {
    sendMessage: (newMessageText: string) => ({ 
        type: "SEND_MESSAGE",
        newMessageText: newMessageText
    } as const)
}

export default dialogsReducer;