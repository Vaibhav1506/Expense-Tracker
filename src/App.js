  import React, {useState, useEffect} from 'react';
  import {BrowserRouter, Routes, Route} from 'react-router-dom';
  import Dashboard from './pages/Dashboard';
  import About from './pages/About';
  import Reports from './pages/Reports';
  import Navbar from './components/Navbar';
  import "./styles/App.css";

  function App() {
    const [transactions, setTransactions] = useState(() => {
      const storedData = localStorage.getItem("transactions");
      return storedData ? JSON.parse(storedData) : [];
    });

    useEffect(() => {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    return (
      <div className = "app-wrapper">
      <BrowserRouter basename="/Expense-Tracker-React-JS-Demo">
          <Navbar/>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Dashboard transactions = {transactions} setTransactions = {setTransactions}/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/reports" element={<Reports transactions = {transactions}/>}/>
          </Routes>
        </div>
      </BrowserRouter>
        <footer className="footer">
          <div className="footer-content">
            <p>Contact</p>

            <div className="footer-links">
              <a href="https://github.com/Vaibhav1506">
                GitHub
              </a>
              <a href="mailto:bvaibhav1506@gmail.com">
                Email
              </a>
              <a href="https://www.linkedin.com/in/vaibhav-bakshi-8b896832a/">
                LinkedIn
              </a>
            </div>

          </div>
        </footer>
      </div>
    );
  }

  export default App;
