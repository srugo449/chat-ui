import { io } from "socket.io-client";

//connecting to Socket.IO chat server
const socket = io("https://ow-chat-server.herokuapp.com");

function connectToSocket() {
  socket.on("connect", function () {
    console.log("connected to chat server!");
  });
}

function registerHandler(onMessageReceived: (x: any) => any) {
  socket.on("ow/chat", onMessageReceived);
}

function sendMessage(msgDetails: Message) {
  socket.emit("ow/chat", {
    avatar: msgDetails.avatar,
    username: msgDetails.username,
    text: msgDetails.text,
    timestamp: msgDetails.timestamp.toString(),
  });
}
function disconnectToSocket() {
  socket.on("disconnect", function () {
    console.log("disconnected from chat server!");
  });
}

export { connectToSocket, registerHandler, sendMessage, disconnectToSocket };
