import React from "react";
import { Routes, Route, Link } from "react-router-dom"

import Jihwan from "./pages/Jihwan"
import About from "./pages/About";
import Counter from "./pages/Counter";
import Input from "./pages/Input";
import Input2 from "./pages/Input2";
import List from "./pages/List";

function App() {
  return (
    <div>
      <div className="Main">
        <nav>
          <Link to="/" style={{ color: 'white', marginRight: '100px', marginLeft: '100px' }}>Jihwan</Link>
          <Link to="/about" style={{ color: 'white', marginRight: '100px' }}>About</Link> 
          <Link to="/counter" style={{ color: 'white', marginRight: '100px' }}>Counter</Link> 
          <Link to="/input" style={{ color: 'white', marginRight: '100px' }}>Input</Link> 
          <Link to="/input2" style={{ color: 'white', marginRight: '100px' }}>Input2</Link> 
          <Link to="/list" style={{ color: 'white', marginRight: '100px' }}>List</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Jihwan />} />
        <Route path="/about" element={<About />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/input" element={<Input />} />
        <Route path="/input2" element={<Input2 />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </div>
  )

}

export default App;