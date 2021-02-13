import {
  Button,
  Container,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React from "react";
import "./MessageStyle.css";

const userLogin = (props: {
  changed: (event: any) => any;
  loginAction: () => any;
  error: boolean;
}) => {
  return (
    <Container className="UserLogin">
      <TextField
        className="login-input"
        id="user-login"
        label="User Name"
        onChange={props.changed}
        error={props.error}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <Button
        className="login-btn"
        variant="contained"
        color="primary"
        onClick={props.loginAction}
      >
        Send
      </Button>
    </Container>
  );
};

export default userLogin;
