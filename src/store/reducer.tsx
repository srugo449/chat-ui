const initialState: ChatRoomState = {
  userName: "",
  avatarUrl:
    "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/005-bullbasaur.png",
  messagesHistoryList: [{ msg: "Hello", timestamp: new Date() }],
  currentMsg: "",
  hasError: false,
};

const reducer = (
  state: ChatRoomState = initialState,
  action: ChatRoomActionType
): ChatRoomState => {
  switch (action.type) {
    case "SEND": {
      if (state.currentMsg === "") {
        return {
          ...state,
          hasError: true,
        };
      }
      let historyMsgs = [...state.messagesHistoryList];
      historyMsgs.push({ msg: state.currentMsg, timestamp: new Date() });
      return {
        ...state,
        hasError: false,
        messagesHistoryList: historyMsgs,
        currentMsg: "",
      };
    }
    case "CHANGE": {
      return {
        ...state,
        currentMsg: action.payload.inputText,
      };
    }
  }
  return state;
};

export default reducer;
