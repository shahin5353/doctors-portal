import React,{useState,useEffect} from 'react';
import './Patients.css'
import spinner from '../../images/icon/spinner_1.gif'

const Patients = () => {
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        fetch('https://doctors-portal-node-mongo.herokuapp.com/patients')
            .then(res => res.json())
            .then(data => setPatients(data))
    }, [])
    return (
        <div className="col-md-10 p-4">
        <h2>Patients</h2>
        <div style={{backgroundColor:"#fff"}} className="my-5 p-3">
            <div className="d-flex flex-items justify-content-between my-5">
            <h4>All Patients</h4>
            </div>
            <table id="patientsTable" className="table border-0">

                <thead>
                    <tr>
                        <th scope="col">Sr. No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Age</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                {
                    patients.length > 0 ?
                    patients.map((patient,index) => {
                    return <tr>
                        <th scope="row">{index+1}</th>
                        <td>{patient.name}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.age}</td>
                        <td>{patient.weight} KG</td>
                        <td>{patient.phone}</td>
                        <td>{patient.address}</td>
                    </tr>
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

export default Patients;