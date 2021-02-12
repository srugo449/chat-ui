import React, { Component } from "react";
import { Container } from "@material-ui/core";
import "./ChatRoom.css";
import InputArea from "../../components/InputArea";
import Message from "../../components/Message";
import { connect } from "react-redux";

class ChatRoom extends Component<ChatRoomState & ChatRoomActions> {
  render() {
    console.log(this.props);
    let messages = [];
    for (let msg of this.props.messagesHistoryList) {
      messages.push(
        <Message
          userName={this.props.userName}
          avatarUrl={this.props.avatarUrl}
          timestamp={msg.timestamp.toDateString()}
          msgContent={msg.msg}
          color="green"
          key={msg.timestamp.toDateString()}
        ></Message>
      );
    }
    return (
      <Container className="ChatRoom">
        {messages}
        <InputArea
          userName={this.props.userName}
          avatarUrl={this.props.avatarUrl}
          click={this.props.sendMsg}
          changed={() => this.props.textChange(e)}
          error={this.props.hasError}
        ></InputArea>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    userName: "Si",
    avatarUrl:
      "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/005-bullbasaur.png",
    messagesHistoryList: [{ msg: "Hello", timestamp: new Date() }],
    currentMsg: "",
    hasError: false,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMsg: () => dispatch({ type: "SEND" }),
    textChange: (event: any) =>
      dispatch({ type: "CHANGE", payload: { inputText: event.target.value } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
