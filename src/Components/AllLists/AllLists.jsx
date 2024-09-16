import './AllLists.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Api } from '../../../utils/utils.js';

import AddList from '../AddList/AddList.jsx'; 
import AddListModal from '../AddList/AddListModal/AddListModal.jsx';

function AllLists() {
    const api = new Api();
    const [allLists, setAllLists] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const closeModal = () => setShowModal(false);

    const handleAddNewList = (new_list) => {
        setAllLists(prevLists => [new_list, ...prevLists]);
        setRefresh(!refresh);
    };

    useEffect(() => {
        const getAllLists = async () => {
            try {
                const lists = await api.getAllLists();
                setAllLists(lists);
            } catch (error) {
                console.error(error);
            }
        };
        getAllLists();
    }, [refresh]);

    return (
        <>
            <AddList addNewList={handleAddNewList} />
            <AddListModal modal={showModal} closeModal={closeModal} addNewList={handleAddNewList} />
            <div className='added_list'>
                {allLists
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((list, index) => (
                    <Link to={`/list/${list.id}`} key={index}>
                        <h2 className='added_list-name'>{list.name} - {list.type}</h2>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default AllLists;
