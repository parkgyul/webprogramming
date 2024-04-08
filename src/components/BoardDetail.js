import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/BoardDetail_style.css";
import { API_BASE_URL } from "../config.js";

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState({});
  const [images, setImages] = useState([]);
  const getBoard = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/board?writingId=${id}`);
      setBoard(response.data);

      const fileIds = response.data.fileIds;
      if (fileIds && fileIds.length > 0) {
        getFileData(fileIds);
      }
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  const getFileData = async (fileIds) => {
    try {
      const files = await Promise.all(
        fileIds.map(async (fileId) => {
          const response = await axios.get(
            `${API_BASE_URL}/board/file/${fileId}`,
            { responseType: "arraybuffer" } // 바이너리 데이터를 받아오도록 설정
          );
          const arrayBufferView = new Uint8Array(response.data);
          const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
          const imageUrl = URL.createObjectURL(blob);
          return imageUrl;
        })
      );
      setImages(files);
    } catch (error) {
      console.error("파일을 가져오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    getBoard();
  }, [id]);

  const moveToEdit = () => {
    navigate("/edit/" + id);
  };

  const deletePost = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await axios.delete(`${API_BASE_URL}/board/${id}`);
      alert("삭제되었습니다.");
      navigate("/");
    }
  };

  const moveToBoard = () => {
    navigate("/");
  };

  return (
    <div className="board-detail-container">
      <div className="board-detail-content">
        <h2 className="board-detail-title">{board.title}</h2>
        <div className="board-detail-info">
          <h5>작성자 : {board.writer}</h5>
          <p style={{ fontSize: "12px", color: "gray" }}>{board.writingTime}</p>
        </div>
        <hr />
        <p className="board-detail-body">{board.body}</p>
        {images.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Image ${index}`} width="500" />
        ))}
        <hr />
        <div className="board-detail-button-group">
          <button onClick={moveToEdit}>수정</button>
          <button onClick={deletePost}>삭제</button>
          <button onClick={moveToBoard}>목록</button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
