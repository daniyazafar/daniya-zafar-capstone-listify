import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Api } from "../../../utils/utils.js";

import backArrow from "../../../src/assets/icons/back.svg";
import checkMark from "../../../src/assets/icons/checkmark.svg";
import darkCheckMark from "../../../src/assets/icons/dark-checkmark.svg";

import './SingleList.scss';

function SingleList() {
    const api = new Api();
    const params = useParams();
    const item_ref = useRef();

    const [listDetails, setListDetails] = useState({});
    const [items, setListItems] = useState([]);

    const handleBackClick = async () => {
        try {
            const items = item_ref.current.innerText.trim().split('\n');
            await api.postItems(params.id, items);
        } catch (error) {
            console.error("Cannot post item to List:", error);
        }
    };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const newItemDiv = document.createElement('div');
            newItemDiv.classList.add('item');

            const imgElement = document.createElement('img');
            imgElement.classList.add('item__checkmark');
            imgElement.src = checkMark;
            imgElement.alt = 'checkmark';

            const textElement = document.createElement('p');
            textElement.classList.add('item__name');
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

    useEffect(() => {
        if (item_ref.current) {
            item_ref.current.innerHTML = items.map(item =>
                `<div class='item'>
                    <img class='item__checkmark' src=${checkMark} alt="checkmark" />
                    <p class ='item__name'>${item.item}</p>
                </div>`
            ).join('');
        
            item_ref.current.addEventListener('keypress', handleEnterKey);
    
            const handleItemClick = (e) => {
                if (e.target.classList.contains('item__checkmark')) {
                    if (e.target.classList.contains('active')) {
                        e.target.src = checkMark;
                        e.target.classList.remove('active');
                    } else {
                        e.target.src = darkCheckMark;
                        e.target.classList.add('active');
                    }
                }
            };
    
            item_ref.current.addEventListener('click', handleItemClick);
    
            return () => {
                if (item_ref.current) {
                    item_ref.current.removeEventListener('keypress', handleEnterKey);
                    item_ref.current.removeEventListener('click', handleItemClick);
                }
            };
        }
    }, [items]);
    
    
    return (
        <>
            <div className="list">
                <div className="list__header">
                    <Link to='/home' onClick={handleBackClick}>
                        <img src={backArrow} alt="back arrow" />
                    </Link>
                    <h1>{listDetails.name} - {listDetails.type}</h1>
                </div>
                <div className="list__area">
                    <div ref={item_ref} className='list__area-field' contentEditable='true'></div>
                </div>
            </div>
        </>
    );
}

export default SingleList;
