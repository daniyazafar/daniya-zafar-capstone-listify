import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Api } from "../../../utils/utils.js";

import backArrow from "../../../src/assets/icons/back.svg";

import './SingleList.scss';

function SingleList() {
    const api = new Api();

    const params = useParams();
    const item_ref = useRef();

    const [ listDetails, setListDetails ] = useState({});
    const [ items, setListItems ] = useState([]);

    const handleBackClick = async () => {
        try {
            const items = item_ref.current.innerText.trim().split('\n');
    
            const response = await api.postItems(params.id, items);
        } catch (error) {
            console.error("Cannot post item to List: ", error);
        }
    }
    

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
                console.error("Cannot get List: ", error);
            }
        };
        getListDetails();
    }, [params.id]);

    useEffect(() => {
        if (item_ref.current) {
            item_ref.current.innerHTML = items.map(item => `<p>${item.item}</p>`).join('');
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
                    <div ref={item_ref} className='list__area-field' contentEditable='true'>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleList