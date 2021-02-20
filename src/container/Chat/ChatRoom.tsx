import React, { Component } from "react";
import InputArea from "../../components/InputArea";
import MessagesHistory from "../../components/MessagesHistory";
import UserLogin from "../../components/UserLogin";
import { ChatRoomActions, ChatRoomState } from "../../chatRoomTypes";
import { registerHandler, sendMessage } from "../../socketApi";
import {
  addMsg,
  addUser,
  setMsgText,
  setUserName,
  setHasError,
} from "../../store/actions";
import { connect } from "react-redux";

const Avatars = [
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/001-snorlax.png",
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/002-psyduck.png",
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/003-pikachu.png",
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/004-jigglypuff.png",
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/005-bullbasaur.png",
];

class ChatRoom extends Component<ChatRoomState & ChatRoomActions> {
  componentDidMount() {
    registerHandler(this.props.addMsg);
  }

  registerUser() {
    if (this.props.userName === "") {
      this.props.setHasError(true);
    } else {
      this.props.setHasError(false);
      let avatarIndex = Math.floor(Math.random() * 5);
      let avatar = Avatars[avatarIndex];

      sessionStorage.setItem(
        "user",
        JSON.stringify({ userName: this.props.userName, avatar })
      );

      this.props.addUser(this.props.userName, avatar);
    }
  }

  loginUser() {
    let oldUser = sessionStorage.getItem("user");
    if (oldUser !== null) {
      const { userName, avatar } = JSON.parse(oldUser);
      this.props.addUser(userName, avatar);
    }
  }

  sendMsg() {
    if (this.props.currentMsg === "") {
      this.props.setHasError(true);
    } else {
      this.props.setHasError(false);
      let msg = {
        text: this.props.currentMsg,
        timestamp: new Date(),
        username: this.props.userName,
        avatar: this.props.avatarUrl,
      };
      this.props.setMsgText("");
      sendMessage(msg);
    }
  }

  render() {
    ///First check is the user is saved in the local storge, which means the user is already logged in, and refreshed the browser.
    if (!this.props.isLoggedIn) {
      this.loginUser();
    }
    ///Check is the user is already logged in, if not display the log in screen.
    if (!this.props.isLoggedIn) {
      return (
        <UserLogin
          loginAction={() => this.registerUser()}
          changed={(e) => this.props.setUserName(e)}
          error={this.props.hasError}
        />
      );
    }
    /// display the chatroom in screen.
    else {
      return (
        <div className="ChatRoom">
          <MessagesHistory
            myUserName={this.props.userName}
            messagesHistoryList={this.props.messagesHistoryList}
          />
          <InputArea
            userName={this.props.userName}
            avatarUrl={this.props.avatarUrl}
            click={() => this.sendMsg()}
            changed={(e) => this.props.setMsgText(e)}
            error={this.props.hasError}
            value={this.props.currentMsg}
          ></InputArea>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: ChatRoomState) => {
  return {
    isLoggedIn: state.isLoggedIn,
    userName: state.userName,
    avatarUrl: state.avatarUrl,
    messagesHistoryList: state.messagesHistoryList,
    currentMsg: state.currentMsg,
    hasError: state.hasError,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addUser: (userName: string, avatar: string) =>
      dispatch(addUser(userName, avatar)),
    setUserName: (event: any) => dispatch(setUserName(event)),
    addMsg: (newMsg: any) => dispatch(addMsg(newMsg)),
    setMsgText: (event?: any) => dispatch(setMsgText(event)),
    setHasError: (errorFlag: boolean) => dispatch(setHasError(errorFlag)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
