type ChatRoomActions = {
  addUser: (userName: string, avatar: string) => void;
  setUserName: (event: any) => void;
  addMsg: (newMsg: any) => void;
  setMsgText: (event: any) => void;
  setHasError: (errorFlag: boolean) => errorFlag;
};

type ChatRoomState = {
  userName: string;
  avatarUrl: string;
  messagesHistoryList: MessageType[];
  currentMsg: string;
  hasError: boolean;
  isLoggedIn: boolean;
};

export type MessageType = {
  text: string;
  timestamp: Date;
  avatar: string;
  username: string;
};
