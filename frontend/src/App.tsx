import React from 'react';
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Landing from './Pages/landing/Landing';
import Entries from './Pages/entries/Entries'
import Dash from './Pages/dash/Dash';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/dashboard" element={<Dash/>} />           
            <Route path="/entries" element={<Entries />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
