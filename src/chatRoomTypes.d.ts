type ChatRoomActions = {
  sendMsg: () => void;
  msgTextChange: (event) => void;
  usernameTextChange: (event) => void;
  register: () => void;
  login: (userName: string, avatar: string) => void;
  start: () => void;
};

type ChatRoomState = {
  userName: string;
  avatarUrl: string;
  messagesHistoryList: Message[];
  currentMsg: string;
  hasError: boolean;
  isLoggedIn: boolean;
};

type Message = {
  text: string;
  timestamp: Date;
  avatar: string;
  username: string;
};

type ChatRoomActionType = {
  type: string;
  payload: any;
};
