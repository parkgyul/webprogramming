import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Link 컴포넌트 import
import { REST_API_URL } from "../config";
import CounselorChat from "./CounselorChat.js";
import "./counselorDesign.css";

const CounselorPage = () => {
  const [totalCounseled, setTotalCounseled] = useState(0);
  const [todayCounseled, setTodayCounseled] = useState(0);
  const [counselingRecords, setCounselingRecords] = useState([]);

  useEffect(() => {
    const fetchCounselingRecords = async () => {
      try {
        const response = await axios.get(`${REST_API_URL}/chat/all`);
        setCounselingRecords(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("상담 기록을 가져오는데 실패했습니다:", error);
      }
    };
    fetchCounselingRecords();
  }, []);

  return (
    <div>
      <div style={{ float: "right", padding: "30px" }}>
        <CounselorChat />
      </div>
      <div style={{ float: "left", padding: "30px", width: "950px" }}>
        <div className="counselor-page">
          <h1 style={{ textAlign: "center" }}>상담사 페이지</h1>
          <div className="counselor-stats">
            <p style={{ fontSize: "14px" }}>
              Total Counseled: {totalCounseled}
            </p>
            <p style={{ fontSize: "14px" }}>
              Today's Counseled: {todayCounseled}
            </p>
          </div>
          <h3>상담 기록</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                {/* 필요한 다른 열 추가 */}
              </tr>
            </thead>
            <tbody>
              {counselingRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    <Link to={`/record/${record.id}`}>{record.id}</Link>{" "}
                  </td>
                  <td>{record.clientName}</td>
                  {/* 필요한 다른 열 추가 */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CounselorPage;
