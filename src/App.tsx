import { Component } from "react";
import "./App.css";
import ChatRoom from "./container/Chat/ChatRoom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChatRoom />
      </div>
    );
  }
}
export default App;
