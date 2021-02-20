import { MessageType } from "../chatRoomTypes";
import {
  ADD_USER,
  SET_USERNAME,
  ADD_MSG,
  SET_MSG_TEXT,
  SET_HAS_ERROR,
  ChatRoomActionType,
} from "./actionsTypes";

export const addUser = (
  userName: string,
  avatar: string
): ChatRoomActionType => ({
  type: ADD_USER,
  payload: { userName, avatar },
});

export const setUserName = (event: any): ChatRoomActionType => ({
  type: SET_USERNAME,
  payload: {
    inputText: event.target.value,
  },
});

export const addMsg = (newMsg: MessageType): ChatRoomActionType => ({
  type: ADD_MSG,
  payload: {
    newMsg,
  },
});

export const setMsgText = (event?: any): ChatRoomActionType => ({
  type: SET_MSG_TEXT,
  payload: {
    inputText: event ? event.target.value : "",
  },
});

export const setHasError = (errorFlag: boolean): ChatRoomActionType => ({
  type: SET_HAS_ERROR,
  payload: {
    errorFlag,
  },
});
