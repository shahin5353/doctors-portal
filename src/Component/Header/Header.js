import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link to="/" className="navbar-brand text-uppercase">Doctor's Portal</Link>
        <button className="navbar-toggler navbar-toggler-left" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" >Home </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" >About</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" >Reviews</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" >Blog</Link>
            </li>
            <li className="nav-item">
              <Link to="/doctor" className="nav-link" >Doctor Panel</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;