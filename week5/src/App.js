import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CounselorPage from "./counselor/counselorPage";
import SelectRolePage from "./selectRolePage";
import ClientPage from "./client/clientPage";
import CounselorHistory from "./counselor/ChatHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectRolePage />} />
        <Route path="/counselor" element={<CounselorPage />} />
        <Route path="/client/:id" element={<ClientPage />} />
        <Route path="/record/:id" element={<CounselorHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
