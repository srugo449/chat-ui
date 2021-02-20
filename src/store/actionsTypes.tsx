import { MessageType } from "../chatRoomTypes";

export const ADD_USER = "ADD_USER";
export const SET_USERNAME = "SET_USERNAME";
export const ADD_MSG = "ADD_MSG";
export const SET_MSG_TEXT = "SET_MSG_TEXT";
export const SET_HAS_ERROR = "SET_HAS_ERROR";

interface AddUserAction {
  type: typeof ADD_USER;
  payload: {
    userName: string;
    avatar: string;
  };
}

interface SetUserNameAction {
  type: typeof SET_USERNAME;
  payload: {
    inputText: string;
  };
}

interface AddMsgAction {
  type: typeof ADD_MSG;
  payload: {
    newMsg: MessageType;
  };
}

interface SetMsgTextAction {
  type: typeof SET_MSG_TEXT;
  payload: {
    inputText: string;
  };
}

interface SetHasErrorAction {
  type: typeof SET_HAS_ERROR;
  payload: {
    errorFlag: boolean;
  };
}

export type ChatRoomActionType =
  | AddUserAction
  | SetUserNameAction
  | AddMsgAction
  | SetMsgTextAction
  | SetHasErrorAction;
