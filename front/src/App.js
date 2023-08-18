import { useState,useEffect } from 'react';
import './App.css';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [user,setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    const value = JSON.parse(saved);
    return value || "";
  });
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser}/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
