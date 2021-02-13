import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import App from "./App";
import ChatRoom from "./container/Chat/ChatRoom";
import { registerHandler, sendMessage } from "./api";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { initialState, reducer } from "./store/reducer";

const testAvatar =
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/001-snorlax.png";

const store = createStore(reducer);

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

afterEach(cleanup);

describe("test the reducer and actions", () => {
  it("should return the initial state", () => {
    expect(initialState).toEqual({
      ...initialState,
    });
  });

  it("should change userName to Mr.A", () => {
    expect(
      reducer(initialState, {
        type: "CHANGE_USERNAME",
        payload: { inputText: "Mr.A" },
      })
    ).toEqual({
      ...initialState,
      userName: "Mr.A",
    });
  });

  it("should change currentMsg to Hi Mr.A", () => {
    expect(
      reducer(initialState, {
        type: "CHANGE_SEND",
        payload: { inputText: "Hi Mr.A" },
      })
    ).toEqual({
      ...initialState,
      currentMsg: "Hi Mr.A",
    });
  });

  it("should register Mr.T and add an avatar", () => {
    let state = {
      userName: "Mr.T",
      avatarUrl: "",
      messagesHistoryList: [],
      currentMsg: "",
      hasError: false,
      isLoggedIn: false,
    };
    expect(
      reducer(state, {
        type: "REGISTER",
      })
    ).toEqual({
      ...state,
      avatarUrl:
        "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/003-pikachu.png",
      isLoggedIn: true,
    });
  });

  it("should send message", () => {
    let state = {
      userName: "Mr.T",
      avatarUrl:
        "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/003-pikachu.png",
      messagesHistoryList: [],
      currentMsg: "Hi Mr.A",
      hasError: false,
      isLoggedIn: true,
    };
    expect(
      reducer(state, {
        type: "SEND",
      })
    ).toEqual({
      ...state,
      hasError: false,
      currentMsg: "",
    });
  });

  it("should receive a message and add it to the history messages", () => {
    let state = {
      userName: "Mr.T",
      avatarUrl: testAvatar,
      messagesHistoryList: [],
      currentMsg: "",
      hasError: false,
      isLoggedIn: true,
    };

    let msg = {
      text: "I'm A Text!",
      avatar: testAvatar,
      timestamp: new Date(2021, 1, 1),
      username: "Shulla",
    };
    expect(
      reducer(state, {
        type: "RECEIVE",
        payload: {
          newMsg: msg,
        },
      })
    ).toEqual({
      ...state,
      messagesHistoryList: [msg],
    });
  });
});
