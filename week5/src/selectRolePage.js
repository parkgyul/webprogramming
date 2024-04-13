import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { REST_API_URL } from "./config.js";
import "./selectRolePage.css"; // 스타일 파일 import

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
        const response = await axios.post(`${REST_API_URL}/chat/room`, {
          clientName: name,
        });
        setId(response.data.response);
        console.log(id);
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
    <div className="select-role-page">
      <h1>상담 페이지</h1>
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
  );
};
export default SelectRolePage;
