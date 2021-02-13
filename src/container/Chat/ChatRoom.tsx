import React, { Component } from "react";
import InputArea from "../../components/InputArea";
import { connect } from "react-redux";
import MessagesHistory from "../../components/MessagesHistory";
import UserLogin from "../../components/UserLogin";
import { registerHandler } from "../../api";
import { ChatRoomActions, ChatRoomState } from "../../chatRoomTypes";

class ChatRoom extends Component<ChatRoomState & ChatRoomActions> {
  componentDidMount() {
    registerHandler(this.props.receive);
  }

  render() {
    if (!this.props.isLoggedIn) {
      let oldUser = sessionStorage.getItem("user");
      if (oldUser !== null) {
        const { userName, avatar } = JSON.parse(oldUser);
        this.props.login(userName, avatar);
      }
    }
    if (!this.props.isLoggedIn) {
      return (
        <UserLogin
          loginAction={this.props.register}
          changed={(e) => this.props.usernameTextChange(e)}
          error={this.props.hasError}
        />
      );
    } else {
      return (
        <div className="ChatRoom">
          <MessagesHistory
            myUserName={this.props.userName}
            messagesHistoryList={this.props.messagesHistoryList}
          />
          <InputArea
            userName={this.props.userName}
            avatarUrl={this.props.avatarUrl}
            click={this.props.sendMsg}
            changed={(e) => this.props.msgTextChange(e)}
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
    receive: (newMsg: any) =>
      dispatch({ type: "RECEIVE", payload: { newMsg } }),
    register: () => dispatch({ type: "REGISTER" }),
    login: (userName: string, avatar: string) =>
      dispatch({ type: "LOGIN", payload: { userName, avatar } }),
    sendMsg: () => dispatch({ type: "SEND" }),
    msgTextChange: (event: any) =>
      dispatch({
        type: "CHANGE_SEND",
        payload: { inputText: event.target.value },
      }),
    usernameTextChange: (event: any) =>
      dispatch({
        type: "CHANGE_USERNAME",
        payload: { inputText: event.target.value },
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
