import { ChatRoomState } from "../chatRoomTypes";
import {
  ChatRoomActionType,
  ADD_USER,
  SET_USERNAME,
  ADD_MSG,
  SET_MSG_TEXT,
  SET_HAS_ERROR,
} from "./actionsTypes";

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
    case ADD_USER: {
      return {
        ...state,
        userName: action.payload.userName,
        avatarUrl: action.payload.avatar,
        isLoggedIn: true,
      };
    }

    case SET_USERNAME: {
      return {
        ...state,
        userName: action.payload.inputText,
      };
    }

    case ADD_MSG: {
      let historyMsgs = [...state.messagesHistoryList];
      historyMsgs.push(action.payload.newMsg);
      return {
        ...state,
        messagesHistoryList: historyMsgs,
      };
    }

    case SET_MSG_TEXT: {
      return {
        ...state,
        currentMsg: action.payload.inputText,
      };
    }

    case SET_HAS_ERROR: {
      return {
        ...state,
        hasError: action.payload.errorFlag,
      };
    }
    default:
      return state;
  }
};

export { reducer, initialState };
