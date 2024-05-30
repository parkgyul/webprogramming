import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { REST_API_URL } from "./config.js";
import "./SelectRolePage.css"; // 스타일 파일 import
import "./chat.css";
const SelectRolePage = () => {
  const [role, setRole] = useState("counselor");
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (role === "counselor") {
      navigate("/counselor");
    } else {
      try {
        const response = await axios.post(`${REST_API_URL}/client/save`, {
          name: name,
        });

        setId(response.data.response);
        if (response.status === 200) {
          navigate(`/client/${response.data.response}`, {
            state: { client_name: name },
          });
        } else {
          console.error("POST 요청 실패");
        }
      } catch (error) {
        console.error("POST 요청 실패:", error);
      }
    }
  };

  const nameInput = role === "client" && (
    <div className="name-input-container">
      <label>
        이름 :
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="name-input"
        />
      </label>
    </div>
  );

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center h-100">
        <div className="col-md-4 col-xl-3 chat">
          <div className="card mb-sm-3 mb-md-0 contacts_card">
            <div className="select-role-page">
              <h1 style={{ color: "white" }}>상담 페이지</h1>
              <h3>환영합니다.</h3>

              <h5>상담사 이십니까? 상담자 이십니까?</h5>

              <form onSubmit={handleSubmit} className="form-container">
                <label>
                  <input
                    type="radio"
                    value="counselor"
                    checked={role === "counselor"}
                    onChange={handleRoleChange}
                  />
                  상담사
                </label>
                <label>
                  <input
                    type="radio"
                    value="client"
                    checked={role === "client"}
                    onChange={handleRoleChange}
                  />
                  상담자
                </label>
                {nameInput}
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectRolePage;
