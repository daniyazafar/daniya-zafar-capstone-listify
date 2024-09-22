import React from 'react';
import './SingleItem.scss';
import checkMark from "../../../src/assets/icons/checkmark.svg";
import darkCheckMark from "../../../src/assets/icons/dark-checkmark.svg";

function SingleItem({ item, handleItemClick }) {
    return (
        <div className='item'>
            <img 
                className={`item__checkmark ${item.is_checked ? "active" : ""}`} 
                data-item-id={item.id}
                src={item.is_checked ? darkCheckMark : checkMark} 
                alt="checkmark"
                onClick={handleItemClick}
            />
            <p className='item__name' contentEditable='true'>{item.item}</p>
        </div>
    );
}

export default SingleItem;