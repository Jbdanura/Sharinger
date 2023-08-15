import { useState } from 'react';
import './App.css';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user,setUser] = useState(null)
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user}/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/register" element={<Home user={user}/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
