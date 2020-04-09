import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'
const Sidebar = () => {
    return (
        <div className="col-md-2 primary-bg p-5">
            <li className="navbar-nav" >
                <Link className="nav-link text-light" to="/">
                    <span className="fa fa-share mb-5 pr-3"></span>
            Go to Site
        </Link>
            </li>
            <li className="navbar-nav">
                <Link className="nav-link text-light" to="/doctor/dashboard">
                    <span className="fa fa-bars pr-3"></span>
            Dashboard
        </Link>
            </li>
            <li className="navbar-nav">
                <Link className="nav-link text-light" to="/doctor/appointment">
                    <span className="fa fa-calendar-minus-o pr-3"></span>
            Appointment
        </Link>
            </li>
            <li className="navbar-nav">
                <Link className="nav-link text-light" to="/doctor/patients">
                    <span className="fa fa-user-o pr-3"></span>
           Patients
        </Link>
            </li>
            <li className="navbar-nav">
                <Link className="nav-link text-light" to="/doctor/prescription">
                    <span className="fa fa-file-text-o pr-3"></span>
          Prescription
        </Link>
            </li>
            <li className="navbar-nav">
                <Link className="nav-link text-light">
                    <span className="fa fa-cog pr-3"></span>
            Settings
        </Link>
            </li>
            <li className="navbar-nav mt-5 pt-5">
                <Link className="nav-link text-light" to="/">
                    <span className="fa fa-arrow-right pr-3"></span>
            Log Out
        </Link>
            </li>
        </div>
    );
};

export default Sidebar;