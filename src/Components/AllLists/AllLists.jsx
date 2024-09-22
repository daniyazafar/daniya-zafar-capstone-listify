import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Api } from '../../../utils/utils.js';

import AddList from '../AddList/AddList.jsx'; 
import AddListModal from '../AddList/AddListModal/AddListModal.jsx';
import DeleteList from '../DeleteList/DeleteList.jsx';
import deleteIcon from '../../../src/assets/icons/delete.svg';

import './AllLists.scss';

function AllLists() {
    const api = new Api();
    const [allLists, setAllLists] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedListId, setSelectedListId] = useState(null);

    const closeModal = () => setShowModal(false);

    const handleAddNewList = (new_list) => {
        setAllLists(prevLists => [new_list, ...prevLists]);
        setRefresh(!refresh);
    };

    const handleDeleteClick = (id) => {
        setSelectedListId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        await api.deleteListById(selectedListId);
        setShowDeleteModal(false);
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
            <DeleteList
                modal={showDeleteModal}
                closeModal={() => setShowDeleteModal(false)}
                handleDelete={handleDeleteConfirm}
            />
            <div className='added_list'>
                {allLists
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((list, index) => (
                        <div className='added_list-name' key={index}>
                            <Link to={`/lists/${list.id}`}>
                                <h2>{list.name} - {list.type}</h2>
                            </Link>
                            <img className='added_list-delete' onClick={() => handleDeleteClick(list.id)} src={deleteIcon} alt="delete icon" />
                        </div>
                ))}
            </div>
        </>
    );
}

export default AllLists;
