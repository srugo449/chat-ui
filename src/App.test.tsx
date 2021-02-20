import React from "react";
import {
  cleanup,
  fireEvent,
  queryByAttribute,
  render,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { initialState, reducer } from "./store/reducer";

import {
  ADD_MSG,
  ADD_USER,
  SET_HAS_ERROR,
  SET_MSG_TEXT,
  SET_USERNAME,
} from "./store/actionsTypes";
import ChatRoom from "./container/Chat/ChatRoom";

const getById = queryByAttribute.bind(null, "id");

const testAvatar =
  "https://ow-publisher-assets.s3.amazonaws.com/chat-app/avatars/001-snorlax.png";

const store = createStore(reducer);

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
        type: SET_USERNAME,
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
        type: SET_MSG_TEXT,
        payload: { inputText: "Hi Mr.A" },
      })
    ).toEqual({
      ...initialState,
      currentMsg: "Hi Mr.A",
    });
  });

  it("should register Mr.T and add an avatar", () => {
    let state = {
      userName: "",
      avatarUrl: "",
      messagesHistoryList: [],
      currentMsg: "",
      hasError: false,
      isLoggedIn: false,
    };
    expect(
      reducer(state, {
        type: ADD_USER,
        payload: { userName: "Mr.T", avatar: testAvatar },
      })
    ).toEqual({
      ...state,
      userName: "Mr.T",
      avatarUrl: testAvatar,
      isLoggedIn: true,
    });
  });

  it("should add message to history", () => {
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
      username: "Mr.T",
    };

    expect(
      reducer(state, {
        type: ADD_MSG,
        payload: { newMsg: msg },
      })
    ).toEqual({
      ...state,
      messagesHistoryList: [msg],
    });
  });

  it("should change has error to true", () => {
    let state = {
      userName: "Mr.T",
      avatarUrl: testAvatar,
      messagesHistoryList: [],
      currentMsg: "",
      hasError: false,
      isLoggedIn: true,
    };

    expect(
      reducer(state, {
        type: SET_HAS_ERROR,
        payload: {
          errorFlag: true,
        },
      })
    ).toEqual({
      ...state,
      hasError: true,
    });
  });

  it("should change has error to false", () => {
    let state = {
      userName: "Mr.T",
      avatarUrl: testAvatar,
      messagesHistoryList: [],
      currentMsg: "",
      hasError: true,
      isLoggedIn: true,
    };

    expect(
      reducer(state, {
        type: SET_HAS_ERROR,
        payload: {
          errorFlag: false,
        },
      })
    ).toEqual({
      ...state,
      hasError: false,
    });
  });
});

describe("test chatroom input componentes", () => {
  it("should insert user name to UserLogin component and save it's value in the state username", () => {
    const utils = render(
      <Provider store={store}>
        <ChatRoom />
      </Provider>
    );

    const input = getById(utils.container, "user-login");
    if (input !== null) {
      fireEvent.change(input, { target: { value: "Mr. A" } });
    }
    const btn = getById(utils.container, "user-login-btn");
    if (btn !== null) {
      fireEvent.click(btn);
    }
    expect(store.getState().userName).toBe("Mr. A");
  });

  it("should insert a message to inputArea component and change it in state currMsg value", () => {
    const utils = render(
      <Provider store={store}>
        <ChatRoom />
      </Provider>
    );

    const input = getById(utils.container, "input-msg");
    if (input !== null) {
      fireEvent.change(input, { target: { value: "Hello Mr.T" } });
    }
    expect(store.getState().currentMsg).toBe("Hello Mr.T");
  });

  it("should falid sending an empty message", () => {
    const utils = render(
      <Provider store={store}>
        <ChatRoom />
      </Provider>
    );
    const input = getById(utils.container, "input-msg");
    if (input !== null) {
      fireEvent.change(input, { target: { value: "" } });
    }

    const btn = getById(utils.container, "sent-msg-btn");
    if (btn !== null) {
      fireEvent.click(btn);
    }
    expect(store.getState().hasError).toBe(true);
  });
});
