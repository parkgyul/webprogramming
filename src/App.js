import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import SelectRolePage from "./SelectRolePage";

import CounselorPage from "./counselor/CouncelorPage";
import ClientPage from "./client/ClientPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Link to={"/rooms"}>채팅방 보기</Link>*/}
        <Routes>
          <Route path="/" element={<SelectRolePage />} />
          <Route path="/counselor" element={<CounselorPage />} />
          <Route path="/client/:id" element={<ClientPage />} />
          {/*<Route path="/record/:id" element={<CounselorHistory />} />*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
