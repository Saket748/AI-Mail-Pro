import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import PdfExtractor from "./pdfComponent/PdfExtracter";
import EmailEditor from "./Email-Editor/EmailEditor.jsx";
import ConfirmPage from "./confirm-page/ConfirmPage.jsx";
import SendEmailPage from "./Sending-Mail/SendEmailPage.jsx";
import LoginPage from "./Login/LoginPage.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Page 1 → Upload Resume */}
        <Route path="/login" element={<LoginPage />} />
        {/* Page 1 → Upload Resume */}
        <Route path="/extract" element={<PdfExtractor />} />

        {/* Page 2 → Preview & Edit Email */}
        <Route path="/email" element={<EmailEditor />} />

        {/* Page 3 → Confirmed Email */}
        <Route path="/confirm" element={<ConfirmPage />} />

        {/* Page 3 → send Email */}
        <Route path="/send-email" element={<SendEmailPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
