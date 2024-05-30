import React from "react";
import "./chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";

import user from "./user.png";
const Chat = () => {
  const MessageItem = ({ type, text, time, image }) => (
    <div
      className={`d-flex justify-content-${
        type === "send" ? "end" : "start"
      } mb-4`}
    >
      {type === "receive" && (
        <div className="img_cont_msg">
          <img src={image} className="rounded-circle user_img_msg" alt="user" />
        </div>
      )}
      <div className={`msg_cotainer${type === "send" ? "_send" : ""}`}>
        {text}
        <span className={`msg_time${type === "send" ? "_send" : ""}`}>
          {time}
        </span>
      </div>
      {type === "send" && <div className="img_cont_msg"></div>}
    </div>
  );
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-4 col-xl-3 chat">
          <div className="card mb-sm-3 mb-md-0 contacts_card">
            <div className="card-header">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="채팅목록"
                  name=""
                  className="form-control search"
                />
                {/*<div className="input-group-prepend">
                    <span className="input-group-text search_btn">
                      <i className="fas fa-search"></i>
                    </span>
    </div>*/}
              </div>
            </div>
            <div className="card-body contacts_body">
              <ul className="contacts">
                <ContactItem name="Khalid" image={user} />
              </ul>
            </div>
            <div className="card-footer"></div>
          </div>
        </div>
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
                  <span className="online_icon"></span>
                </div>
                <div className="user_info">
                  <span>Chat with Khalid</span>
                </div>
              </div>
            </div>
            <div className="card-body msg_card_body">
              <MessageItem
                type="receive"
                text="Hi, how are you samim?"
                time="8:40 AM, Today"
                image="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              />
              <MessageItem
                type="send"
                text="Hi Khalid i am good tnx how about you?"
                time="8:55 AM, Today"
              />
              <MessageItem
                type="receive"
                text="I am good too, thank you for your chat template"
                time="9:00 AM, Today"
                image="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              />
              <MessageItem
                type="send"
                text="You are welcome"
                time="9:05 AM, Today"
              />
              <MessageItem
                type="receive"
                text="I am looking for your next templates"
                time="9:07 AM, Today"
                image={user}
              />
              <MessageItem
                type="send"
                text="Ok, thank you have a good day"
                time="9:10 AM, Today"
              />
              <MessageItem
                type="receive"
                text="Bye, see you"
                time="9:12 AM, Today"
                image="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
              />
            </div>
            <div className="card-footer">
              <div className="input-group">
                <div className="input-group-append">
                  <span className="input-group-text attach_btn">
                    <i className="fas fa-paperclip"></i>
                  </span>
                </div>
                <textarea
                  name=""
                  className="form-control type_msg"
                  placeholder="Type your message..."
                ></textarea>
                <div className="input-group-append">
                  <span className="input-group-text send_btn">
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

const ContactItem = ({ name, image }) => (
  <li>
    <div className="d-flex bd-highlight">
      <div className="img_cont">
        <img src={image} className="rounded-circle user_img" alt="user" />
      </div>
      <div className="user_info">
        <span>{name}</span>
      </div>
    </div>
  </li>
);

export default Chat;
