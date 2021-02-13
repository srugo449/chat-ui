type ChatRoomActions = {
  sendMsg: () => void;
  msgTextChange: (event) => void;
  usernameTextChange: (event) => void;
  register: () => void;
  login: (userName: string, avatar: string) => void;
  receive: (newMsg: any) => void;
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

type ChatRoomActionType = {
  type: string;
  payload?: any;
};
