import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';

function Navbar() {
    return (
        <div className="navbar">

            <div className="logo-container">
                <img src = {logo} alt="logo" className="logo-img"/>
                <h2 className="logo-text">Expense Tracker</h2>
            </div>

            <div className="nav-links">
                <Link to="/" className="nav-link">Dashboard</Link>
                <Link to="/reports" className="nav-link">Reports</Link>
                <Link to="/about" className="nav-link">About</Link>
            </div>

        </div>
    );
}

export default Navbar;