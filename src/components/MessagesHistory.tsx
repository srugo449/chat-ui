import React from "react";
import { MessageType } from "../chatRoomTypes";
import Message from "./Message";
import "./MessageStyle.css";

let key = 0;

const messagesHistory = (props: {
  messagesHistoryList: MessageType[];
  myUserName: string;
}) => {
  let messages = [];
  for (let msg of props.messagesHistoryList) {
    messages.push(
      <Message
        userName={msg.username}
        avatarUrl={msg.avatar}
        timestamp={msg.timestamp.toString()}
        msgContent={msg.text}
        owner={msg.username === props.myUserName ? "owner" : "other"}
        key={++key}
      ></Message>
    );
  }
  return <div className="MessagesList">{messages}</div>;
};

export default messagesHistory;
