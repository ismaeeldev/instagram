import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';

import Home from "./pages/instagram";
import Facebook from "./pages/facebook";
import Google from "./pages/google";
import OTP from "./pages/OTP"
import logo from './assets/logo.png'
import fbLogo from './assets/facebook-logo.png'
import googleLogo from './assets/google-logo.png'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instagram-verify-otp" element={<OTP logo={logo} />} />
        <Route path="/verify-otp" element={<OTP logo={fbLogo} />} />
        <Route path="/verify" element={<OTP logo={googleLogo} />} />
        <Route path="/facebook/login" element={<Facebook />} />
        <Route path="/google/login" element={<Google />} />
      </Routes>
    </Router>
  );
}

export default App;
