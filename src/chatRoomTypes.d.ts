type ChatRoomActions = {
  sendMsg: any;
  textChange: any;
};

type ChatRoomState = {
  userName: string;
  avatarUrl: string;
  messagesHistoryList: Message[];
  currentMsg: string;
  hasError: boolean;
};

type Message = {
  msg: string;
  timestamp: Date;
};

type ChatRoomActionType = {
  type: string;
  payload: any;
};
