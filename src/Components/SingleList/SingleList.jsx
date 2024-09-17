import { useParams } from "react-router-dom";
import './SingleList.scss';
import { useEffect, useState } from "react";
import { Api } from "../../../utils/utils.js";

function SingleList() {
    const api = new Api();
    const params = useParams();
    const [ listDetails, setListDetails ] = useState({});

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
            <h1>{listDetails.name} - {listDetails.type}</h1>
        </>
    )
}

export default SingleList