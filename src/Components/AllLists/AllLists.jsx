import './AllLists.scss'
import addIcon from '../../assets/icons/add.svg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Api } from '../../../utils/utils.js';

import AddList from '../AddList/AddList.jsx'; 
import AddListModal from '../AddList/AddListModal/AddListModal.jsx';

function AllLists() {
    const api = new Api();
    const [ allLists, setAllLists ] = useState([]);

    const [ showModal, setShowModal ] = useState(false);
    const [ newList, setNewList ] = useState([])
    
    const handleOpenModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleAddNewList = (new_list_name) => {
        setNewList(prevList => ([...prevList, new_list_name]));
    }

    useEffect( () => {
        const getAllLists = async () => {
            try {
                const lists = await api.getAllLists();
                console.log(lists);
                setAllLists(lists);
            } catch (error) {
                console.error(error)
            }
        };
        getAllLists();
    },[]);

    return (
        <>
        <AddList addNewList={handleAddNewList} /> 
        <AddListModal modal = {showModal} closeModal={closeModal} addNewList={handleAddNewList} />
        <div className='added_list'>
            {allLists.map((list, index) => (
                <Link to='/listItem' key={index}><h2 className='added_list-name'>{list.name}</h2></Link>
            ))}
        </div>
        <div className='added_list'>
            {newList.map((list, index) => (
                <Link to='/listItem' key={index}><h2 className='added_list-name'>{list}</h2></Link>
            ))}
        </div>
        </>
    )
}

export default AllLists  