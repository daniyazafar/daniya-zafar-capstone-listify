import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { Api } from "../../../utils/utils.js";

import checkMark from "../../../src/assets/icons/checkmark.svg";

import ListTitle from './ListTitle/ListTitle';
import ListArea from './ListArea/ListArea';

import './SingleList.scss';

function SingleList() {
    const api = new Api();
    const params = useParams();
    const item_ref = useRef();

    const [listDetails, setListDetails] = useState({});
    const [items, setListItems] = useState([]);

    const handleBackClick = async () => {
        try {
            const itemsText = item_ref.current.innerText.trim().split('\n');
            await api.postItems(params.id, itemsText);
        } catch (error) {
            console.error("Cannot post items to List:", error);
        }
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            const newItemDiv = document.createElement('div');
            newItemDiv.classList.add('item');

            const imgElement = document.createElement('img');
            imgElement.classList.add('item__checkmark');
            imgElement.src = checkMark;
            imgElement.alt = 'checkmark';

            const textElement = document.createElement('p');
            textElement.contentEditable = 'true';

            newItemDiv.appendChild(imgElement);
            newItemDiv.appendChild(textElement);
            item_ref.current.appendChild(newItemDiv);

            const range = document.createRange();
            const selection = window.getSelection();
            range.selectNodeContents(textElement);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };

    const handleItemClickEvent = (e) => {
        const itemId = e.target.getAttribute('data-item-id');
        const clickedItem = items.find(item => item.id === parseInt(itemId));
        if (clickedItem && e.target.classList.contains('item__checkmark')) {
            const newIsChecked = !clickedItem.is_checked;
            if (newIsChecked) {
                e.target.classList.add('active');
            } else {
                e.target.classList.remove('active');
            }
            handleItemClick(clickedItem.id, clickedItem.is_checked);
        }
    };

    const handleItemClick = async (itemId, currentIsChecked) => {
        try {
            const newIsChecked = !currentIsChecked;
            await api.updateItemCheckmark(params.id, itemId, newIsChecked);
    
            setListItems(items.map(item =>
                item.id === itemId ? { ...item, is_checked: newIsChecked } : item
            ));
        } catch (error) {
            console.error("Cannot update item checkmark:", error);
        }
    };

    useEffect(() => {
        const getListDetails = async () => {
            try {
                const response = await api.getListById(params.id);
                if (response) {
                    const itemsOfList = await api.getListItemsByListId(params.id);
                    setListDetails(response);
                    setListItems(itemsOfList);
                } else {
                    console.error("List not found");
                }
            } catch (error) {
                console.error("Cannot get List:", error);
            }
        };
        getListDetails();
    }, [params.id]);

    return (
        <div className="list">
            <ListTitle listDetails={listDetails} handleBackClick={handleBackClick} />
            <ListArea 
                items={items} 
                handleEnterKey={handleEnterKey}
                handleItemClickEvent={handleItemClickEvent}
                item_ref={item_ref} 
            />
        </div>
    );
}

export default SingleList;