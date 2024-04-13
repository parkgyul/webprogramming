import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../config.js";
import { useLocation, useParams } from "react-router";
import "./ClientPage.css";

const ClientChat = () => {
  const location = useLocation();
  const { id } = useParams();
  const name = location.state.client_name;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(`${API_BASE_URL}`);

    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    setSocket(newSocket);

    if (socket) {
      socket.close();
    }

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [name]);

  const sendMessage = () => {
    const message = {
      writer: name,
      content: newMessage,
      roomId: id,
    };
    if (socket) {
      socket.send(JSON.stringify(message));
    }
    setNewMessage("");
  };

  return (
    <div className="client-chat-container">
      <div>
        <h2>{name}님, 안녕하세요!</h2>
        <div className="message-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.from === name ? "me" : "other"}`}
            >
              <p>
                <span
                  className={`message-sender ${
                    message.from === name ? "me" : "other"
                  }`}
                >
                  {message.from}:
                </span>{" "}
                {message.text}
              </p>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="message-input"
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientChat;
