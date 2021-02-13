import { registerHandler, sendMessage } from "../api";

const Avatars = [
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/001-snorlax.png",
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/002-psyduck.png",
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/003-pikachu.png",
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/004-jigglypuff.png",
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/005-bullbasaur.png",
];

const initialState: ChatRoomState = {
  userName: "",
  avatarUrl: "",
  messagesHistoryList: [],
  currentMsg: "",
  hasError: false,
  isLoggedIn: false,
};

const reducer = (
  state: ChatRoomState = initialState,
  action: ChatRoomActionType
): ChatRoomState => {
  switch (action.type) {
    case "REGISTER": {
      if (state.userName === "") {
        return {
          ...state,
          hasError: true,
        };
      }
      let avatarIndex = Math.floor(Math.random() * 6);
      let avatar = Avatars[avatarIndex];

      sessionStorage.setItem(
        "user",
        JSON.stringify({ userName: state.userName, avatar })
      );

      return {
        ...state,
        avatarUrl: avatar,
        isLoggedIn: true,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        userName: action.payload.userName,
        avatarUrl: action.payload.avatar,
        isLoggedIn: true,
      };
    }
    case "START_CHAT": {
      registerHandler((newMsg: any) => {
        let historyMsgs = [...state.messagesHistoryList];
        historyMsgs.push(newMsg);
        return {
          ...state,
          messagesHistoryList: historyMsgs,
        };
      });
      break;
    }
    case "SEND": {
      if (state.currentMsg === "") {
        return {
          ...state,
          hasError: true,
        };
      }
      let msg = {
        text: state.currentMsg,
        timestamp: new Date(),
        username: state.userName,
        avatar: state.avatarUrl,
      };
      sendMessage(msg);
      let historyMsgs = [...state.messagesHistoryList];
      historyMsgs.push(msg);
      return {
        ...state,
        hasError: false,
        currentMsg: "",
        messagesHistoryList: historyMsgs,
      };
    }
    case "CHANGE_SEND": {
      return {
        ...state,
        currentMsg: action.payload.inputText,
      };
    }
    case "CHANGE_USERNAME": {
      return {
        ...state,
        userName: action.payload.inputText,
      };
    }
  }
  return state;
};

export default reducer;
