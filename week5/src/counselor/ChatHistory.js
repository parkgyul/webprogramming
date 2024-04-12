import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { REST_API_URL } from "../config";
import { useParams } from "react-router-dom";
import "./ChatHistory.css"; // CSS 파일 import

const ChatHistory = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${REST_API_URL}/room/${id}`); // 채팅 내용을 가져오는 API 엔드포인트
        setMessages(response.data); // 가져온 채팅 내용을 상태에 설정
      } catch (error) {
        console.error("채팅 내용을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchData(); // 함수 호출
  }, [id]); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!messages) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chat-container">
      <h1>채팅 내용</h1>
      <ul>
        {messages.map((message, index) => (
          <li
            key={index}
            className={`chat-message ${
              message.sender === "counselor"
                ? "counselor-message"
                : "user-message"
            }`}
          >
            {message.sender === "counselor" ? (
              <p>{message.content}</p>
            ) : (
              <p>
                <span>{message.name}</span> {message.content}
              </p>
            )}
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
};

export default ChatHistory;
