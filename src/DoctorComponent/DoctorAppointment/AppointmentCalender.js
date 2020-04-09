import React from 'react';
import {Calendar} from 'primereact/calendar';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';
import { useEffect } from 'react';
import { useState } from 'react';
import './AppointmentCalendar.css'
const AppointmentCalendar = (props)=> {
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
    useEffect(()=>{
        props.dateHandler(formateDate)
    },[date,formateDate,props])
    

        return (
              <div className="col-md-4 px-5">
                   <h2 className="my-5">Appointment</h2>
                    <Calendar value={date} onChange={(e) => {setDate(e.value);formateDateF(e.value);}} inline={true} id="appointmentCalender"/>
                   
                </div>
        );
    }
export default AppointmentCalendar;
