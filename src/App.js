/*    /index.html   200 */
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppBody from './Component/AppBody/AppBody';
import CalendarPicker from './Component/CalendarPicker/CalendarPicker';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Header from './Component/Header/Header';
import Appointment from './Component/Appointment/Appointment';
import Sidebar from './DoctorComponent/Sidebar/Sidebar';
import Dashboard from './DoctorComponent/Dashboard/Dashboard';
import DoctorAppointment from './DoctorComponent/DoctorAppointment/DoctorAppointment';
import Patients from './DoctorComponent/Patients/Patients';
import Prescription from './DoctorComponent/Prescriptions/Prescription';
import AppointmentCalendar from './DoctorComponent/DoctorAppointment/AppointmentCalender';

function App() {
  const [date,setDate]= useState()
  const dateHandler = (date)=>{
    setDate(date);
  }
  
  return (
    <div>
       <Router>
         <Switch>
           <Route exact path="/">
             <div className="container mask">
             <Header/>
             <AppBody/>
             </div>
           </Route>
           <Route path="/appointment">
           <div className="container mask">
             <Header/>
             <CalendarPicker dateHandler={dateHandler}/>
             </div>
             <Appointment date={date}/>
            
           </Route>
           <Route exact path="/doctor">
           <div className="container-fluid bg-light">
            <div className="row">
            <Sidebar/>
            <Dashboard/>
            </div>
            </div>
           </Route>
           <Route path="/doctor/dashboard">
           <div className="container-fluid bg-light">
            <div className="row">
            <Sidebar/>
            <Dashboard/>
            </div>
            </div>
           </Route>
           <Route path="/doctor/appointment">
           <div className="container-fluid bg-light">
            <div className="row">
            <Sidebar/>
            <AppointmentCalendar dateHandler={dateHandler}/>
            <DoctorAppointment  date={date}/>
            </div>
            </div>
           </Route>
           <Route path="/doctor/patients">
           <div className="container-fluid bg-light">
            <div className="row">
            <Sidebar/>
            <Patients/>
            </div>
            </div>
           </Route>
           <Route path="/doctor/prescription">
           <div className="container-fluid bg-light">
            <div className="row">
            <Sidebar/>
            <Prescription/>
            </div>
            </div>
           </Route>

         </Switch>
       </Router>
    </div>
  )
}



export default App;





