import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/PostForm_style.css";
import { API_BASE_URL } from "../config.js";

const PostForm = ({ addPost }) => {
  const navigate = useNavigate();
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const savePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (image1) formData.append("files", image1);
    if (image2) formData.append("files", image2);

    const boardRequestData = {
      writer: writer,
      title: title,
      body: body,
    };
    const blob = new Blob([JSON.stringify(boardRequestData)], {
      type: "application/json",
    });
    formData.append("boardRequest", blob);

    for (let value of formData.values()) {
      console.log(value);
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/board`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert("게시물이 등록되었습니다.");
        navigate("/");
      } else {
        throw new Error("게시물 등록 실패");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("게시물 등록에 실패했습니다.");
    }
  };

  const backToBoard = () => {
    navigate("/");
  };

  const onChangeImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="container">
      <div className="input-group">
        <h2 style={{ textAlign: "center" }}>글쓰기</h2>
        <span>제목</span>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="input-group">
        <span>작성자</span>
        <input
          type="text"
          placeholder="작성자"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
        />
      </div>

      <div>
        <textarea
          placeholder="내용"
          cols="100"
          rows="10"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <br />
      <span>사진 추가하기</span>
      <div className="file-input">
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChangeImageUpload(e, setImage1)}
        />
        {image1 && (
          <img
            src={URL.createObjectURL(image1)}
            className="image-preview"
            width="200"
          />
        )}
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChangeImageUpload(e, setImage2)}
        />
        {image2 && (
          <img
            src={URL.createObjectURL(image2)}
            className="image-preview"
            width="200"
          />
        )}
      </div>

      <div className="button-group">
        <button onClick={savePost}>저장</button>
        <button onClick={backToBoard}>취소</button>
      </div>
    </div>
  );
};

export default PostForm;
