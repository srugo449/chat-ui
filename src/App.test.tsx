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
import InputArea from "./components/InputArea";
import UserLogin from "./components/UserLogin";

const getById = queryByAttribute.bind(null, "id");

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

describe("test chatroom input componentes", () => {
  it("should insert user name to UserLogin component and save it's value in the state username", () => {
    const { hasError } = store.getState();

    const utils = render(
      <Provider store={store}>
        <UserLogin
          loginAction={() => store.dispatch({ type: "REGISTER" })}
          changed={(event: any) =>
            store.dispatch({
              type: "CHANGE_USERNAME",
              payload: { inputText: event.target.value },
            })
          }
          error={hasError}
        />
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
    const { userName, avatarUrl, currentMsg, hasError } = store.getState();

    const utils = render(
      <Provider store={store}>
        <InputArea
          userName={userName}
          avatarUrl={avatarUrl}
          click={() => store.dispatch({ type: "SEND" })}
          changed={(event: any) =>
            store.dispatch({
              type: "CHANGE_SEND",
              payload: { inputText: event.target.value },
            })
          }
          error={hasError}
          value={currentMsg}
        />
      </Provider>
    );
    const input = getById(utils.container, "input-msg");
    if (input !== null) {
      fireEvent.change(input, { target: { value: "Hello Mr.T" } });
    }
    expect(store.getState().currentMsg).toBe("Hello Mr.T");
  });

  it("should falid sending an empty message", () => {
    const { userName, avatarUrl, hasError, currentMsg } = store.getState();

    const utils = render(
      <Provider store={store}>
        <InputArea
          userName={userName}
          avatarUrl={avatarUrl}
          click={() => store.dispatch({ type: "SEND" })}
          changed={(event: any) =>
            store.dispatch({
              type: "CHANGE_SEND",
              payload: { inputText: event.target.value },
            })
          }
          error={hasError}
          value={currentMsg}
        />
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
