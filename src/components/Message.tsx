import { Avatar } from "@material-ui/core";
import React from "react";
import "./MessageStyle.css";

const message = (props: {
  userName: string;
  avatarUrl: string;
  timestamp: string;
  msgContent: string;
  owner: string;
}) => {
  return (
    <div className={"Message " + props.owner}>
      <div className="name-box">
        <Avatar className="avatar" alt={props.userName} src={props.avatarUrl} />
        <h5>{props.userName} says:</h5>
      </div>
      <div className="msg-box">
        <p className="msg-text">{props.msgContent}</p>
        <p className="date-text">{props.timestamp}</p>
      </div>
    </div>
  );
};

export default message;
