import { useEffect } from 'react';
import checkMark from "../../../../src/assets/icons/checkmark.svg";
import darkCheckMark from "../../../../src/assets/icons/dark-checkmark.svg";
import './ListItems.scss';

function ListItems({ items, handleEnterKey, handleItemClickEvent, item_ref }) {
    useEffect(() => {
        if (item_ref.current) {
            item_ref.current.innerHTML = items.map(item => 
                `<div class='item'>
                    <img class='item__checkmark ${item.is_checked ? "active" : ""}' 
                        data-item-id="${item.id}" 
                        src=${item.is_checked ? darkCheckMark : checkMark} 
                        alt="checkmark" />
                    <p>${item.item}</p>
                </div>`
            ).join('');

            item_ref.current.addEventListener('keypress', handleEnterKey);
            item_ref.current.addEventListener('click', handleItemClickEvent);

            return () => {
                if (item_ref.current) {
                    item_ref.current.removeEventListener('keypress', handleEnterKey);
                    item_ref.current.removeEventListener('click', handleItemClickEvent);
                }
            };
        }
    }, [items]);

    return (
        <div ref={item_ref} className='list__area-field' contentEditable='true'></div>
    );
}

export default ListItems;