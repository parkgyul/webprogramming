import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from "./components/Board";
import PostForm from "./components/PostForm";
import BoardDetail from "./components/BoardDetail";
import PostEditForm from "./components/PostEditForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="/postform" element={<PostForm />} />
        <Route path="/edit/:id" element={<PostEditForm />} />
      </Routes>
    </Router>
  );
}

export default App;
