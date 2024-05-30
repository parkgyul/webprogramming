import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ChatPage() {
  const { roomId } = useParams();
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [writer, setWriter] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8788/api/v1/rooms/${roomId}`
        );
        const messages = response.data.data.messageList;
        setMessages(messages);
      } catch (error) {
        console.error("채팅 내역 로드 실패", error);
      }
    };

    loadChatHistory();
    const client = new Client({
      brokerURL: "ws://localhost:8788/chat",
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(`/topic/public/rooms/${roomId}`, (message) => {
          const msg = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, msg]);
        });
      },
    });
    client.activate();
    setStompClient(client);
    return () => {
      client.deactivate();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (stompClient && newMessage) {
      const chatMessage = {
        from: writer,
        text: newMessage,
        roomId: parseInt(roomId || ""),
      };
      stompClient.publish({
        destination: `/app/chat/rooms/${roomId}/send`,
        body: JSON.stringify(chatMessage),
      });
      console.log(messages);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div>
        <Link to={"/rooms"} className="back-link">
          뒤로 가기
        </Link>
      </div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.writer}: {msg.content}
          </div>
        ))}
      </div>
      <div className="input-group">
        <label>작성자</label>
        <input
          type="text"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
