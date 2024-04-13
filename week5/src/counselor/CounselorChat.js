import React, { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../config.js";
import "./CounselorChat.css"; // 스타일 파일 import

const CounselorChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = new WebSocket(`${API_BASE_URL}`);

    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = () => {
    const message = {
      from: "counselor", // 송신자 정보 추가
      text: newMessage,
    };
    setMessages((prevMessages) => [...prevMessages, message]);
    if (socket) {
      socket.send(JSON.stringify(message));
    }
    setNewMessage("");
  };

  return (
    <div className="counselor-chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div>
            <span>{message.from}</span>
            <div
              key={index}
              className={`message ${
                message.from === "counselor" ? "sent" : "received"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default CounselorChat;
