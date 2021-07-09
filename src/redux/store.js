import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

 let store = {
  _state : {
    profilePage: {
        postsData: [
          {id: 1, data: "Post1", likeCount: 21},
          {id: 2, data: "Post2", likeCount: 22},
          {id: 3, data: "Post3", likeCount: 1},
          {id: 4, data: "Post4", likeCount: 232},
          {id: 5, data: "Post5", likeCount: 11},
        ],
        newPostText: "aa11"
    },
    dialogsPage:{
      dialogsData : [
          {id: 1, name: "Ruslan", messagesData: [
            {id: 1, message: "Hello1"},
            {id: 2, message: "How are you?1"},
            {id: 3, message: "Blalalalalalalala1"},
            {id: 4, message: "lol1"},
            {id: 5, message: "bye1"},
          ]},
          {id: 2, name: "Andriy", messagesData: [
            {id: 1, message: "Hello2"},
            {id: 2, message: "How are you?2"},
            {id: 3, message: "Blalalalalalalala2"},
            {id: 4, message: "lol2"},
            {id: 5, message: "bye2"},
          ]},
          {id: 3, name: "Petro", messagesData: [
            {id: 1, message: "Hello3"},
            {id: 2, message: "How are you?3"},
            {id: 3, message: "Blalalalalalalala3"},
            {id: 4, message: "lol3"},
            {id: 5, message: "bye3"},
          ]},
          {id: 4, name: "Vasiy", messagesData: [
            {id: 1, message: "Hello4"},
            {id: 2, message: "How are you?4"},
            {id: 3, message: "Blalalalalalalala4"},
            {id: 4, message: "lol4"},
            {id: 5, message: "bye4"},
          ]},
          {id: 5, name: "Valera", messagesData: [
            {id: 1, message: "Hello5"},
            {id: 2, message: "How are you?5"},
            {id: 3, message: "Blalalalalalalala5"},
            {id: 4, message: "lol5"},
            {id: 5, message: "bye5"},
          ]},
        ],
      newTextMessage:""
    }
  },
  _callSubscriber () { },

  getState(){return this._state},
  subscribe (observer){
    this._callSubscriber = observer;
  },
 
  dispatch(action){
    debugger
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    
    this._callSubscriber(this._state);
    
  }

}

 // export default store;