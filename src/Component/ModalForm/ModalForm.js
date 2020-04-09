import React from 'react';
import { useForm } from 'react-hook-form'
const ModalForm = (props) => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => { 
    data.scheduleId = props.schedule._id;
    fetch('https://doctors-portal-node-mongo.herokuapp.com/addAppointment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(data => {
            alert('You have successfully placed your appointment\n\nPlease Note Your Appointment ID : '+data._id)
            document.location.reload();
          })      
    
  };

  return (
    <div className="modal fade" id={props.schedule._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="col-12 modal-title text-center primary-color font-weight-bold" id="exampleModalLongTitle">{props.schedule.title}</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form" id="form">
                <div className="form-group">
                  <select id="inputState" name="time" className="form-control text-uppercase" ref={register({ required: true })}>
                    <option>{props.schedule.time}</option>
                  </select>
                  {errors.time && <span className="text-danger">Time is required</span>}
                </div>
                <div className="form-group">
                  <input type="text" className="form-control text-uppercase" name="name" placeholder="your name" ref={register({ pattern: /^[A-Za-z ]+$/i, required: true })} />
                  {errors.name && <span className="text-danger">Name is required</span>}
                </div>
              </div>
              <div className="form-group">
                <input type="tel" className="form-control text-uppercase" name="phone" placeholder="phone number" ref={register({ pattern: /^[0-9]+$/i, required: true })} />
                {errors.phone && <span className="text-danger">Phone Number is required</span>}
              </div>
              <div className="form-group">
                <input type="email" className="form-control text-uppercase" name="email" placeholder="email address" ref={register({ required: true })} />
                {errors.email && <span className="text-danger">Email address is required</span>}
              </div>
              <div className="form-group">
                <input type="date" className="form-control text-uppercase" value={props.date} disabled name="date" placeholder="" ref={register({ required: true })} />
                {errors.date && <span className="text-danger">Date is required</span>}
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

export default ModalForm;