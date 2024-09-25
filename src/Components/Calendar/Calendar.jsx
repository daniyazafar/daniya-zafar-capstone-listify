import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from './path_to_your_calendar_icon.svg';

function CalendarPicker() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    return (
        <div className="calendar-container">
        <img 
            src={calendarIcon} 
            alt="Calendar Icon" 
            onClick={toggleCalendar} 
            style={{ width: '50px', height: '50px', cursor: 'pointer' }}
        />
        {showCalendar && (
            <div className="calendar-popup">
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
            />
            </div>
        )}
        </div>
    );
}

export default CalendarPicker;
