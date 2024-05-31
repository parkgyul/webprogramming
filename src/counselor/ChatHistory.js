import React, { useEffect, useState } from "react";
import axios from "axios";
import { REST_API_URL, API_BASE_URL } from "../config.js";
import user from "../user.png";

const ChatHistory = ({ onSelectChat }) => {
  const [chatList, setChatList] = useState([]);
  const fetchChatList = async () => {
    try {
      const response = await axios.get(`${REST_API_URL}/room/list`);
      if (response.status === 200) {
        setChatList(response.data.response);
      } else {
        console.error("get 요청 실패");
      }
    } catch (error) {
      console.error("get 요청 실패:", error);
    }
  };

  useEffect(() => {
    fetchChatList();
  }, []);

  const ContactItem = ({ name, image, roomId }) => (
    <li>
      <div className="d-flex bd-highlight">
        <div className="img_cont">
          <img src={image} className="rounded-circle user_img" alt="user" />
        </div>
        <div className="user_info">
          <span onClick={() => onSelectChat(roomId)}>{name}</span>
        </div>
      </div>
    </li>
  );
  return (
    <div className="col-md-4 col-xl-3 chat">
      <div className="card mb-sm-3 mb-md-0 contacts_card">
        <div className="card-header">
          <div className="input-group">
            <input
              placeholder="채팅 기록을 보려면 이름을 클릭하세요."
              className="form-control search"
            />
            <button
              onClick={fetchChatList}
              style={{
                width: "45px",
                height: "50px",
                background: "black",
                color: "white",
              }}
            >
              새로고침
            </button>
          </div>
        </div>
        <div className="card-body contacts_body">
          <ul className="contacts">
            {chatList.map((list, index) => (
              <ContactItem
                key={index}
                name={list.clientName}
                image={user}
                roomId={list.roomId}
              />
            ))}
          </ul>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
};

export default ChatHistory;
