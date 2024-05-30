import React, { useEffect, useState } from "react";
import "../chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useLocation, useParams } from "react-router";
import { API_BASE_URL } from "../config.js";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";

import user from "../user.png";
const ClientPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const name = location.state.client_name;
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket(`${API_BASE_URL}/client`);
    setSocket(newSocket);
    newSocket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);

      const data = JSON.parse(receivedMessage);

      const message = {
        from: data.from,
        mes: data.mes,
        roomId: data.roomId,
      };

      setMessages((prevMessages) => [...prevMessages, message]);
    };
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
      from: name,
      mes: newMessage,
      roomId: id,
    };
    setMessages((prevMessages) => [...prevMessages, message]);
    if (socket) {
      socket.send(JSON.stringify(message));
    }
    setNewMessage("");
  };

  const MessageItem = ({ type, text, image }) => (
    <div
      className={`d-flex justify-content-${
        type === name ? "end" : "start"
      } mb-4`}
    >
      {type === "counselor" && (
        <div className="img_cont_msg">
          <img src={image} className="rounded-circle user_img_msg" alt="user" />
        </div>
      )}
      <div className={`msg_cotainer${type === name ? "_send" : ""}`}>
        {text}
      </div>
      {type === name && <div className="img_cont_msg"></div>}
    </div>
  );
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-8 col-xl-6 chat">
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
                <div className="user_info">
                  <span>{name}님, 환영합니다!</span>
                </div>
              </div>
            </div>
            <div className="card-body msg_card_body">
              {messages.map((message, index) => (
                <MessageItem
                  type={`${message.from}`}
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

export default ClientPage;
