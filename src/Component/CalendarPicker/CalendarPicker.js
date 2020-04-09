import React from 'react';
import {Calendar} from 'primereact/calendar';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';
import './CalendarPicker.css'
import mask from '../../images/Mask_Group_1.png'
import { useEffect } from 'react';
import { useState } from 'react';
const CalendarPicker = (props)=> {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    let minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);
    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);
    const next = new Date();
    next.setDate(new Date().getDate()+1);
    const [date,setDate] = useState(next);
    const [formateDate,setFormateDate] = useState();
    const formateDateF = (d)=>{
        d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
        const strDate = JSON.stringify(d).slice(1,11);
        setFormateDate(strDate)
    }
    const [error,setError] = useState(false)
    useEffect(()=>{
        const today = new Date();
        if(today>date){
            setError(true) 
        }else{
            setError(false)
            props.dateHandler(formateDate)
        } 
    },[date,error,formateDate,props])
    

        return (
            <div>
              <div className="row">
              <div className="col-md-6 ml-5">
                   <h2 className="my-5">Appointment</h2>
                    <Calendar value={date} onChange={(e) => {setDate(e.value);formateDateF(e.value);}} inline={true} id="calendarPicker"/>
                    {
                        error === true &&
                        <div className="">
                            <p id="err" className="text-danger">You can't set appointment today or past</p>
                        </div>
                    
                    }
                   
                </div>
                <div className="col-md-5 my-5 d-md-block d-sm-none">
                   <img className="img-fluid pt-3" src={mask} alt=""/>
                </div>
              </div>
            </div>
        );
    }
export default CalendarPicker;
