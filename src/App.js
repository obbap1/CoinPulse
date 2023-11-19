import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CoinListPage from "./pages/CoinListPage";
import '../src/index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/coin-list" element={<CoinListPage />} />
      </Routes>
    </Router>
  );
};

export default App;
