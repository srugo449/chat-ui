import { Avatar, Button, TextField } from "@material-ui/core";
import React from "react";
import "./InputAreaStyle.css";

const inputArea = (props: {
  userName: string;
  avatarUrl: string;
  click: () => void;
  changed: (event: any) => void;
  error: boolean;
  value: string;
}) => {
  return (
    <div className="InputArea">
      <Avatar
        className="avatar-display"
        alt={props.userName}
        src={props.avatarUrl}
      />
      <TextField
        className="text-field"
        id="input-msg"
        fullWidth={true}
        label="Type a message here..."
        onChange={props.changed}
        error={props.error}
        value={props.value}
      />
      <Button
        id="sent-msg-btn"
        className="send-btn"
        variant="contained"
        color="primary"
        onClick={props.click}
      >
        Send
      </Button>
    </div>
  );
};

export default inputArea;
