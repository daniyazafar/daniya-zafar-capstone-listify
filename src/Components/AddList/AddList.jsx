import { useState } from 'react';
import addIcon from '../../assets/icons/add.svg'; 
import AddListModal from './AddListModal/AddListModal.jsx';
import './AddList.scss';

function AddList({ addNewList }) {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <>
        <div className="add">
            <div className="add__click" onClick={handleOpenModal}>
            <img className="add__icon" src={addIcon} alt="Add Icon" />
            <p className="add__text">Add a new list</p>
            </div>
        </div>
        <AddListModal modal={showModal} closeModal={closeModal} addNewList={addNewList} />
        </>
    );
}

export default AddList;
