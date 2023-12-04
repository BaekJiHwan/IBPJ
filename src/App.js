import React from "react";
import { Routes, Route, Link } from "react-router-dom"

import Jihwan from "./pages/Jihwan";
import JunChul from './pages/JunChul';
import Counter from "./pages/Counter";
import ChatGPT from "./pages/ChatGPT";
import DALLE from "./pages/DALLE";
import Input2 from "./pages/Input2";
import List from "./pages/List";

function App() {
    return (
        <div>
            <div className="Main">
                <nav>
                    <Link to="/" style={{ color: 'white', marginRight: '100px', marginLeft: '100px' }}>Jihwan</Link>
                    <Link to="/JunChul" style={{ color: 'white', marginRight: '100px' }}>JunChul</Link>
                    <Link to="/ChatGPT" style={{ color: 'white', marginRight: '100px' }}>ChatGPT</Link>
                    <Link to="/DALLE" style={{ color: 'white', marginRight: '100px' }}>DALLE</Link>
                    <Link to="/counter" style={{ color: 'white', marginRight: '100px' }}>Counter</Link>
                    <Link to="/input2" style={{ color: 'white', marginRight: '100px' }}>Input2</Link>
                    <Link to="/list" style={{ color: 'white', marginRight: '100px' }}>List</Link>
                </nav>
            </div>

            <Routes>
                <Route path="/" element={<Jihwan />} />
                <Route path="/JunChul" element={<JunChul />} />
                <Route path="/DALLE" element={<DALLE />} />
                <Route path="/counter" element={<Counter />} />
                <Route path="/ChatGPT" element={<ChatGPT />} />
                <Route path="/input2" element={<Input2 />} />
                <Route path="/list" element={<List />} />
            </Routes>
        </div>
    )

}

export default App;