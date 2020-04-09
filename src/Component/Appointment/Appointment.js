import React,{useState,useEffect} from 'react';
import './Appointment.css';
import Spinner from '../../images/icon/spinner_1.gif'
import ModalForm from '../ModalForm/ModalForm';
const Appointment = (props) => {
    const [schedules,setSchedules] = useState([])
    const next = new Date();
    next.setDate(new Date().getDate()+1);
    next.setMinutes(next.getMinutes()-next.getTimezoneOffset());
    const date = JSON.stringify(next).slice(1,11);
    useEffect(()=>{
        fetch("https://doctors-portal-node-mongo.herokuapp.com/schedules")
    .then(res=>res.json())
    .then(data=>{
        setSchedules(data)
        document.getElementById('spinner').style.display="none"
    })
    },[])
    return (
        <div className="container my-5 text-center bg-mask py-5" >
            <h3 className="primary-color">Available Appointments on {props.date?props.date:date}</h3>
                <div  className="col-12 my-5">
                    <img className="img-fluid mx-auto" id="spinner" src={Spinner} alt="spinner"/>
                </div>
                <div className="row">
                {
                    schedules.map(schedule=>{
                        return <div className="col-md-4 p-4" key={schedule._id}>
                        <div className="card p-3 border-0 shadow">
                            <div className="card-body">
                                <h5 className="card-title primary-color">{schedule.title}</h5>
                                <p className="card-text">{schedule.time}</p>
                                <p className="card-text">{schedule.space} SPACES AVAILABLE</p>
                                <button className="btn btn-primary text-uppercase primary-btn" data-toggle="modal" data-target={"#"+schedule._id}>Book appointment</button>
                            </div>
                        </div>
                        <ModalForm date={props.date?props.date:date} schedule={schedule} key={schedule._id}/>
                    </div>
                    })
                }
                </div>
        </div>
    );
};

export default Appointment;