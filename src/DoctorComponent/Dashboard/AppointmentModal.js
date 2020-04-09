import React from 'react';
import { useForm } from 'react-hook-form'

const AppointmentModal = (props) => {
  const { register, handleSubmit, errors } = useForm()
  const appointment = props.appointment;
  function formatAMPM(time) {
    var timeSplit = time.split(':'),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours === 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }
    return (hours + ':' + minutes + ' ' + meridian);
  }
  const onSubmit = (data, e) => {
    const from = formatAMPM(data.from)
    const to = formatAMPM(data.to)
    const time = from.concat(" - ").concat(to);
    const {id,date,name,phone} = data;
    const newData = {id,date,name,phone,time}
    console.log(newData);
    fetch('https://doctors-portal-node-mongo.herokuapp.com/updateAppointment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
          })
          .then(res => res.json())
          .then(data => {
            alert("update success")
            document.location.reload();
          })  

  };

  return (
    <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="col-12 modal-title text-center primary-color font-weight-bold" id="exampleModalLongTitle">Update Appointment</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form">
              <div className="form-group d-none">
                <input type="text" value={appointment._id} className="form-control text-uppercase" name="id" ref={register({ required: true })}/>
              </div>
              <div className="form-group">
                  <input defaultValue={appointment.date} type="date" className="form-control text-uppercase" name="date" ref={register({ required: true })} />
                  {errors.date && <span className="text-danger">Date is required</span>}
                </div>
              <div className="d-flex flex-row">
              <div className="form-group col-6">
                  <label htmlFor="fromTime">Start Time</label>
                  <input id="fromTime" type="time" className="form-control text-uppercase" name="from" ref={register({ required: true })} />
                  {errors.from && <span className="text-danger">Time is required</span>}
                </div>
                <div className="form-group col-6">
                  <label htmlFor="toTime">End Time</label>
                  <input id="toTime" type="time" className="form-control text-uppercase" name="to" ref={register({ required: true })} />
                  {errors.to && <span className="text-danger">Time is required</span>}
                </div>
              </div>
                <div defaultValue={appointment.name} className="form-group">
                  <input defaultValue={appointment.name} type="text" className="form-control text-uppercase" name="name" placeholder="your name" ref={register({ pattern: /^[A-Za-z ]+$/i, required: true })} />
                  {errors.name && <span className="text-danger">Name is required</span>}
                </div>
                <div className="form-group">
                  <input defaultValue={appointment.phone} type="tel" className="form-control text-uppercase" name="phone" placeholder="phone number" ref={register({ pattern: /^[0-9]+$/i, required: true })} />
                  {errors.phone && <span className="text-danger">Phone Number is required</span>}
                </div>
              </div>
              <div className="d-flex flex-items justify-content-end">
              <button type="button" className="btn btn-secondary px-5 mr-3" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary text-uppercase primary-btn px-5">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;