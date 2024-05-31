import React, { useEffect, useState } from "react";
import "../chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { REST_API_URL, API_BASE_URL } from "../config.js";
import axios from "axios";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";
import user from "../user.png";
import ChatHistory from "./ChatHistory";

const CounselorPage = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatRoomId, setChatRoomId] = useState(null);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [ing, setIng] = useState(false);
  const [today, setToday] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newSocket = new WebSocket(`${API_BASE_URL}/counselor`);

    setSocket(newSocket);

    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);

      if (receivedMessage.type === "roomId") {
        setChatRoomId(receivedMessage.roomId);
        setIng(true);
      } else {
        const message = {
          sender: receivedMessage.sender,
          mes: receivedMessage.mes,
          roomId: receivedMessage.roomId,
        };
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    const message = {
      sender: "counselor",
      mes: newMessage,
      roomId: chatRoomId,
    };
    setMessages((prevMessages) => [...prevMessages, message]);
    if (socket) {
      socket.send(JSON.stringify(message));
    }
    setNewMessage("");
  };

  useEffect(() => {
    if (ing) {
      const message = {
        sender: "h",
        mes: `채팅방 ${chatRoomId}번 상담이 시작되었습니다.`,
        roomId: chatRoomId,
      };
      setMessages((prevMessages) => [...prevMessages, message]);
    }
    setIng(false);
    getTodayNumber();
    getTotalNumber();
  }, [chatRoomId]);

  const getTodayNumber = async () => {
    try {
      const response = await axios.get(`${REST_API_URL}/room/today`);
      if (response.status === 200) {
        console.log(response.data);
        setToday(response.data.response);
      } else {
        console.error("today / get 요청 실패");
      }
    } catch (error) {
      console.error("get 요청 실패:", error);
    }
  };
  const getTotalNumber = async () => {
    try {
      const response = await axios.get(`${REST_API_URL}/room/total`);
      if (response.status === 200) {
        console.log(response.data);
        setTotal(response.data.response);
      } else {
        console.error("today / get 요청 실패");
      }
    } catch (error) {
      console.error("get 요청 실패:", error);
    }
  };

  const MessageItem = ({ type, text, image }) => (
    <div
      className={`d-flex justify-content-${
        type === "counselor" ? "end" : "start"
      } mb-4`}
    >
      {type !== "counselor" && (
        <div className="img_cont_msg">
          <img src={image} className="rounded-circle user_img_msg" alt="user" />
        </div>
      )}
      <div className={`msg_cotainer${type === "counselor" ? "_send" : ""}`}>
        {text}
      </div>
      {type === "counselor" && <div className="img_cont_msg"></div>}
    </div>
  );

  const getChatMessage = async (roomId) => {
    try {
      const response = await axios.get(`${REST_API_URL}/messages/${roomId}`);
      if (response.status === 200) {
        console.log(response.data);
        setHistoryMessages("");
        setHistoryMessages(response.data.response); // 메시지 목록을 업데이트합니다.
        ChatMessageHistory(roomId);
      } else {
        console.error("get 요청 실패");
      }
    } catch (error) {
      console.error("get 요청 실패:", error);
    }
  };

  const ChatMessageHistory = (roomId) => {
    return (
      <div className="col-md-4 col-xl-3 chat">
        <div className="card">
          <div className="card-header msg_head">
            <div className="d-flex bd-highlight">
              <div className="img_cont">
                <img
                  src={user}
                  className="rounded-circle user_img"
                  alt="user"
                />
              </div>
              {historyMessages.length > 0 && historyMessages[0].roomId && (
                <div className="user_info">
                  <span>"{`${historyMessages[0].roomId}`}"번방의 상담내역</span>
                </div>
              )}
            </div>
          </div>
          <div className="card-body msg_card_body">
            {historyMessages.map((message) => (
              <MessageItem
                type={`${message.sender}`}
                text={`${message.message}`}
                image={user}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  const onSelectChat = (roomId) => {
    getChatMessage(roomId);
  };

  const Number = () => {
    return (
      <div className="col-md-1 col-xl-2 ">
        <div className="card2">
          <br />
          <div style={{ textAlign: "center" }}>
            <h5>total : {total}</h5>
          </div>
          <div style={{ textAlign: "center" }}>
            <h5>today : {today}</h5>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        {Number()}
        {ChatMessageHistory()}
        <ChatHistory onSelectChat={onSelectChat} />

        {/*여기서 부터 채팅 */}
        <div className="col-md-5 col-xl-4 chat">
          <div className="card">
            <div className="card-header msg_head">
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img
                    src={user}
                    className="rounded-circle user_img"
                    alt="user"
                  />
                  <span className="online_icon"></span>
                </div>
                <div className="user_info">
                  <span>{chatRoomId} 님 상담중</span>
                </div>
              </div>
            </div>
            <div className="card-body msg_card_body">
              {messages.map((message) => (
                <MessageItem
                  type={`${message.sender}`}
                  text={`${message.mes}`}
                  image={user}
                />
              ))}
            </div>
            <div className="card-footer">
              <div className="input-group">
                <div className="input-group-append">
                  <span className="input-group-text"></span>
                </div>
                <textarea
                  name=""
                  className="form-control type_msg"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                ></textarea>
                <div className="input-group-append">
                  <span
                    className="input-group-text send_btn"
                    onClick={sendMessage}
                  >
                    <i className="fas fa-location-arrow"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorPage;
