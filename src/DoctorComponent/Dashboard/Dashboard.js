import React, { Fragment } from 'react';
import './Dashboard.css'
import { useEffect } from 'react';
import { useState } from 'react';
import spinner from '../../images/icon/spinner_1.gif'
import StatusModal from './StatusModal';
import AppointmentModal from './AppointmentModal'
import PrescriptionFormModal from './PrescriptionFormModal'
import PrescriptionViewModal from './PrescriptionViewModal'

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetch('https://doctors-portal-node-mongo.herokuapp.com/appointments')
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [])
    const pendingAppointments = []
    appointments.filter(appointment=>{
        appointment.status === "pending" &&
        pendingAppointments.push(appointment);
    })
    const todayAppointment = []
    const today = new Date();
    today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
    const date = JSON.stringify(today).slice(1,11);
    appointments.filter(appointment=>{
        appointment.date === date &&
        todayAppointment.push(appointment);
    })
    const [totalPatients, setTotalPatients] = useState([]);
    useEffect(() => {
        fetch('https://doctors-portal-node-mongo.herokuapp.com/totalPatients')
            .then(res => res.json())
            .then(data => setTotalPatients(data))
    }, [])
    
    return (
        <div className="col-md-10 p-4">
            <h2>Dashboard</h2>
            <div className="card-deck text-light mt-5">
                <div style={{ backgroundColor: '#F1536E' }} className="card">
                    <div className="card-body d-flex flex-items">
                        <div className="col-sm-4">
                            <h1>
                            {pendingAppointments.length}
                            </h1>
                        </div>
                        <div className="col-sm-8">
                            <h3>Pending Appointment</h3>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#3DA5F4' }} className="card">
                    <div className="card-body d-flex flex-items">
                        <div className="col-sm-4">
                            <h1>{todayAppointment.length}</h1>
                        </div>
                        <div className="col-sm-8">
                            <h3>Today's Appointment</h3>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#00C689' }} className="card">
                    <div className="card-body d-flex flex-items">
                        <div className="col-sm-4">
                            <h1>{appointments.length}</h1>
                        </div>
                        <div className="col-sm-8">
                            <h3>Total Appointment</h3>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#FDA006' }} className="card">
                    <div className="card-body d-flex flex-items">
                        <div className="col-sm-4">
                            <h1>{totalPatients[0]}</h1>
                        </div>
                        <div className="col-sm-8">
                            <h3>Total Patients</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "#fff" }} className="my-5 p-3">
                <div className="d-flex flex-items justify-content-between my-5">
                    <h4>Recent Appointments</h4>
                </div>
                <table id="dashboardTable" className="table border-0">

                    <thead>
                        <tr>
                            <th scope="col">Sr. No</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Name</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Prescription</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.length > 0 ?
                                appointments.map((appointment,index) => {
                                    return <Fragment>
                                        <tr>
                                            <th scope="row">{index+1}</th>
                                            <td>{appointment.date}</td>
                                            <td>{appointment.time}</td>
                                            <td>{appointment.name}</td>
                                            <td>{appointment.phone}</td>
                                            {
                                                appointment.prescription === null ?
                                                <td><button data-toggle="modal" data-target={"#prf" + appointment._id} className="btn btn-block text-dark">Not Added</button></td>
                                                :
                                                <td><button data-toggle="modal" data-target={"#prv" + appointment._id} className="btn btn-block primary-btn text-dark">View</button></td>
                                            }
                                            {
                                                appointment.status === "pending" &&
                                                <td><button data-toggle="modal" data-target={"#st" + appointment._id} className="btn secondary-btn text-light px-3">{appointment.status}</button><button data-toggle="modal" data-target={"#ap" + appointment._id} className="btn btn-warning  text-light"><span className="fa fa-pencil"></span></button></td>
                                            }
                                            {
                                                appointment.status === "approved" &&
                                                <td><button data-toggle="modal" data-target={"#st" + appointment._id} className="btn btn-success text-light px-3">{appointment.status}</button><button data-toggle="modal" data-target={"#ap" + appointment._id} className="btn btn-warning  text-light"><span className="fa fa-pencil"></span></button></td>
                                            }
                                            {
                                                appointment.status === "cancelled" &&
                                                <td><button data-toggle="modal" data-target={"#st" + appointment._id} className="btn btn-danger text-light px-3">{appointment.status}</button><button data-toggle="modal" data-target={"#ap" + appointment._id} className="btn btn-warning  text-light"><span className="fa fa-pencil"></span></button></td>
                                            }
                            <button id="successBtn"  data-toggle="modal" data-target="#successModal" type="button" className="d-none">success</button>

                                        </tr>
                                       <StatusModal id={"st"+appointment._id} appointment={appointment}></StatusModal>
                                       <AppointmentModal id={"ap"+appointment._id} appointment={appointment}></AppointmentModal>
                                       <PrescriptionFormModal id={"prf"+appointment._id} appointment={appointment}></PrescriptionFormModal>
                                       <PrescriptionViewModal id={"prv"+appointment._id} appointment={appointment}></PrescriptionViewModal>
                                    </Fragment>
                                    

                                })
                                :
                                <tr className="text-center">
                                    <td colSpan="7"><img src={spinner} alt="spinner" /></td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;