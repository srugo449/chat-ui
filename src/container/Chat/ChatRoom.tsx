import React, { Component, useEffect } from "react";
import { Container } from "@material-ui/core";
import "./ChatRoom.css";
import InputArea from "../../components/InputArea";
import { connect } from "react-redux";
import MessagesHistory from "../../components/MessagesHistory";
import UserLogin from "../../components/UserLogin";
import { registerHandler } from "../../api";

class ChatRoom extends Component<ChatRoomState & ChatRoomActions> {
  constructor(props: any) {
    super(props);
    this.props.start();
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
      console.log(this.props.messagesHistoryList);
      return (
        <Container className="ChatRoom">
          <MessagesHistory
            messagesHistoryList={this.props.messagesHistoryList}
          />
          <InputArea
            userName={this.props.userName}
            avatarUrl={this.props.avatarUrl}
            click={this.props.sendMsg}
            changed={(e) => this.props.msgTextChange(e)}
            error={this.props.hasError}
          ></InputArea>
        </Container>
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
    start: () => dispatch({ type: "START_CHAT" }),
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
