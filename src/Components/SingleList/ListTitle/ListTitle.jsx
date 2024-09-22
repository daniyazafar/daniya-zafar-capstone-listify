import { useParams, Link, useNavigate } from 'react-router-dom';
import { Api } from "../../../../utils/utils.js";
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import backArrow from "../../../../src/assets/icons/back.svg";
import calendarIcon from "../../../../src/assets/icons/calendar.svg";
import './ListTitle.scss';

function ListTitle({ listDetails, handleBackClick }) {
    const api = new Api();
    const params = useParams();
    const navigate = useNavigate();
    
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleOrganizeClick = async () => {
        try {
            const response = await api.organizeList(params.id);
            const categorizedItems = Object.entries(response).map(([key, value]) => {
                return {
                    category: key,
                    items: Object.entries(value).map(([subKey, subValue]) => {
                        return {
                            subcategory: subKey,
                            item: subValue
                        };
                    })
                };
            });
    
            navigate(`/lists/${params.id}/organized`, { state: { categorizedItems, listDetails } });
        } catch (error) {
            console.error('Failed to organize list:', error);
        }
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setShowCalendar(false); // Close calendar after selecting a date
    };

    return (
        <div className="list__header">
            <Link to='/lists' onClick={handleBackClick}>
                <img src={backArrow} alt="back arrow" />
            </Link>
            <h1>{listDetails.name} - {listDetails.type}</h1>
            
            {listDetails.type === 'Grocery' && (
                <div className='list__header-button' onClick={handleOrganizeClick}>
                    Organize
                </div>
            )}

            {listDetails.type === 'Routine' && (
                <div className='list__header-calendar'>
                    <img 
                        src={calendarIcon} 
                        alt="Calendar icon" 
                        onClick={toggleCalendar} 
                        style={{ cursor: 'pointer', width: '50px', height: '50px' }} 
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
            )}
        </div>
    );
}

export default ListTitle;
