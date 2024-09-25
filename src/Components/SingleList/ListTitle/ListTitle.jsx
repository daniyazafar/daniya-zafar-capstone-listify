import { useParams, Link, useNavigate } from 'react-router-dom';
import { Api } from "../../../../utils/utils.js";
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import backArrow from "../../../../src/assets/icons/back.svg";
import calendarIcon from "../../../../src/assets/icons/calendar.svg";
import './ListTitle.scss';

function ListTitle({ listDetails, handleBackClick }) {
    const api = new Api();
    const params = useParams();
    const navigate = useNavigate();

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isOrganizing, setIsOrganizing] = useState(false);

    const handleOrganizeClick = async () => {
        try {
            setIsOrganizing(true);
            await handleBackClick();
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
            setIsOrganizing(false);
            navigate(`/lists/${params.id}/organized`, { state: { categorizedItems, listDetails } });
        } catch (error) {
            setIsOrganizing(false);
            console.error('Failed to organize list:', error);
        }
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    return (
        <>
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
                            style={{ cursor: 'pointer', width: '3.125rem', height: '3.125rem' }} 
                        />
                    </div>
                )}
            </div>

            {isOrganizing && (
                <div className="sparkle-overlay">
                    {[...Array(50)].map((_, index) => (
                        <div key={index} className={`sparkle sparkle-${index + 1}`}></div>
                    ))}
                </div>
            )}
        </>
    );
}

export default ListTitle;
