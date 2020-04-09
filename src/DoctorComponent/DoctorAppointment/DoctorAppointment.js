import React, { useEffect, useState } from 'react';
import spinner from '../../images/icon/spinner_1.gif'
import './DoctorAppointment.css'

const DoctorAppointment = (props) => {
    const today = new Date();
    today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
    const date = JSON.stringify(today).slice(1,11);
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetch('https://doctors-portal-node-mongo.herokuapp.com/appointments')
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [])
    const [filterAppointments,setFilterAppointments] =useState([]);
    useEffect(()=>{
        var filterArray = []
        appointments.filter(appointment=>{
            if(appointment.date === (props.date?props.date:date) ){
                filterArray.push(appointment)
            }
        })
        setFilterAppointments(filterArray)
    },[date,props,appointments])
    const visitHandler = (e,id) => {
        fetch('https://doctors-portal-node-mongo.herokuapp.com/updateVisited', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                [e.target.name]:e.target.value,
                id
            })
          })
          .then(res => res.json())
          .then(data => {
            alert("update success")
          })  

    }
    return (
            <div className="col-md-6 p-5">
                <div style={{ backgroundColor: "#fff" }} className="my-5 p-3">
                    <div className="d-flex flex-items justify-content-between my-4">
                        <h4>Appointment</h4>
                        <h5>{props.date?props.date:date}</h5>
                    </div>
                    <table id="patientsTable" className="table border-0">

                        <thead>
                            <tr>
                                <th scope="col">Sr. No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Schedule</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>  
                               {
                                appointments.length > 0 ?
                                    filterAppointments.length > 0 ?
                                        filterAppointments.map((appointment,index)=>{
                                            return <tr>
                                            <th scope="row">{index+1}</th>
                                            <td>{appointment.name}</td>
                                            <td>{appointment.time}</td>
                                            <td>
                                                    {
                                                        appointment.visited === "true" &&
                                                        <select onChange={(e)=>visitHandler(e,appointment._id)} className="form-control-sm text-light select" name="visitStatus">
                                                        <option>Visited</option>
                                                        <option value="false">Not Visited</option>
                                                        </select>
                                                    }
                                                     {
                                                        appointment.visited === "false" &&
                                                        <select onChange={(e)=>visitHandler(e,appointment._id)} className="form-control-sm text-light select" name="visitStatus">
                                                        <option>Not Visited</option>
                                                        <option value="true">Visited</option>
                                                        </select>
                                                    }
                                                
                                            </td>
                                            </tr>
                                        })
                                        :
                                        <tr>
                                                <td className="text-center pt-5" colSpan="4"><h2>No Appointment</h2></td>
                                        </tr>
                                :
                                <tr className="text-center">
                                    <td colSpan="4"><img src={spinner} alt="spinner" /></td>
                                </tr>
                               }
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default DoctorAppointment;