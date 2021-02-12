import { Avatar } from "@material-ui/core";
import React from "react";
import "./MessageStyle.css";

const message = (props: {
  userName: string;
  avatarUrl: string;
  timestamp: string;
  msgContent: string;
  color: string;
}) => {
  return (
    <div className="Message">
      <Avatar alt={props.userName} src={props.avatarUrl} />
      <div className="msg-box">
        <span>
          <h6>{props.userName}</h6>
          <p>{props.timestamp}</p>
        </span>
        <p>{props.msgContent}</p>
      </div>
    </div>
  );
};

export default message;
