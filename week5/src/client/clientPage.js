import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config.js";
import { useLocation } from "react-router";

const ClientChat = () => {
  const location = useLocation();
  const name = location.state.client_name;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  console.log(name);

  useEffect(() => {
    const newSocket = new WebSocket(`${API_BASE_URL}`);

    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    setSocket(newSocket);

    // 이전 소켓 연결 종료
    if (socket) {
      socket.close();
    }

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [name]); // 이름이 변경될 때마다 useEffect가 다시 실행되도록 설정

  const sendMessage = () => {
    const message = {
      from: name,
      text: newMessage,
    };
    if (socket) {
      socket.send(JSON.stringify(message));
    }
    setNewMessage("");
  };

  return (
    <div>
      <h2>Client Chat</h2>
      <p>Hello, {name}!</p>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              {message.from}: {message.text}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ClientChat;
