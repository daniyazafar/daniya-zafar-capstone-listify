import './AddList.scss'
import addIcon from '../../assets/icons/add.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddListModal from './AddListModal/AddListModal';

function AddList() {

    const [ showModal, setShowModal ] = useState(false);
    const [ newList, setNewList ] = useState([])
    
    const handleOpenModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleAddNewList = (new_list_name) => {
        setNewList(prevList => ([...prevList, new_list_name]));
    }

    return (
        <>
        <div className='add'>
            <div className='add__click' onClick={handleOpenModal}>
                <img className='add__icon' src={addIcon} alt="Add Icon" />
                <p className='add__text'>Add a new list</p>
            </div>
        </div>
        <AddListModal modal = {showModal} closeModal={closeModal} addNewList={handleAddNewList} />
        {newList.map((list, index) => (
            <Link to='/listItem' key={index}><h2>{list}</h2></Link>
        ))}
        </>
    )
}

export default AddList  