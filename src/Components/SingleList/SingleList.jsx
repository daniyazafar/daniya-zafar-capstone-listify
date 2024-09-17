import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../../utils/utils.js";

import backArrow from "../../../src/assets/icons/back.svg";

import './SingleList.scss';

function SingleList() {
    const api = new Api();
    const params = useParams();
    const [ listDetails, setListDetails ] = useState({});

    const handleBackClick = () => {
        alert("going back!");
    }

    useEffect(() => {
        const getListDetails = async () => {
            try {
                const response = await api.getListById(params.id);
                setListDetails(response);
            } catch (error) {
                console.error("Cannot get List: ", error);
            }
        };
        getListDetails();
    },[])

    return (
        <>
        <div className="list">
            <div className="list__header">
                <Link to='/home' onClick={handleBackClick}><img src={backArrow} alt="back arrow" /></Link>
                <h1>{listDetails.name} - {listDetails.type}</h1>
            </div>
            <div className="list__area">
                <div className='list__area-field' contentEditable='true'></div>
                <div className='list__area-field-tablet' contentEditable='true'></div>
            </div>
        </div>
        </>
    )
}

export default SingleList