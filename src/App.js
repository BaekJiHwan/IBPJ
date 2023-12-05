import React from "react";
import { Routes, Route, Link } from "react-router-dom"

import Jihwan from "./pages/Jihwan";
import JunChul from './pages/JunChul';
import ChatGPT from "./pages/ChatGPT";
import DALLE from "./pages/DALLE";
import Moohee from "./pages/Moohee";
import Jiyoung from "./pages/Jiyoung";
import KakaoTalk from "./pages/KakaoTalk"

function App() {
    return (
        <div>
            <div className="Main">
                <nav>
                    <Link to="/" style={{ color: 'white', marginRight: '100px', textDecoration: 'none' }}>Jihwan</Link>
                    <Link to="/JunChul" style={{ color: 'white', marginRight: '100px', textDecoration: 'none' }}>JunChul</Link>
                    <Link to="/Moohee" style={{ color: 'white', marginRight: '100px', textDecoration: 'none' }}>Moohee</Link>
                    <Link to="/Jiyoung" style={{ color: 'white', marginRight: '100px', textDecoration: 'none' }}>Jiyoung</Link>
                    <Link to="/ChatGPT" style={{ color: 'yellow', marginRight: '100px', textDecoration: 'none' }}>ChatGPT</Link>
                    <Link to="/DALLE" style={{ color: 'yellow', marginRight: '100px', textDecoration: 'none' }}>DALLE</Link>
                    <Link to="/KaKaoTalk" style={{ color: 'yellow', marginRight: '100px', textDecoration: 'none' }}>Talk</Link>
                </nav>
            </div>

            <Routes>
                <Route path="/" element={<Jihwan />} />
                <Route path="/JunChul" element={<JunChul />} />
                <Route path="/Moohee" element={<Moohee />} />
                <Route path="/Jiyoung" element={<Jiyoung />} />
                <Route path="/DALLE" element={<DALLE />} />
                <Route path="/ChatGPT" element={<ChatGPT />} />
                <Route path="/KakaoTalk" element={<KakaoTalk />} />
            </Routes>
        </div>
    )

}

export default App;