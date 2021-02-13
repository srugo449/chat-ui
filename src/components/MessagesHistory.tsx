import React from "react";
import Message from "./Message";
import "./MessageStyle.css";

let key = 0;

const messagesHistory = (props: { messagesHistoryList: Message[] }) => {
  let messages = [];
  for (let msg of props.messagesHistoryList) {
    messages.push(
      <Message
        userName={msg.username}
        avatarUrl={msg.avatar}
        timestamp={msg.timestamp.toDateString()}
        msgContent={msg.text}
        color="green"
        key={key++}
      ></Message>
    );
  }
  return <div className="MessagesList">{messages}</div>;
};

export default messagesHistory;
