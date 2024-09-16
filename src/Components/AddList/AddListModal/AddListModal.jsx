import { useRef } from 'react';

import './AddListModal.scss';

function AddListModal({ modal, closeModal, addNewList }) {
    
    const list_name = useRef();

    if (!modal) return null;

    const handleAddClick = () => {
        closeModal();
        const new_list_name = list_name.current.value;
        addNewList(new_list_name);
    };

        return (
            <>
            <div className='modal-overlay' onClick={closeModal}>
                <form action="" className='modal' onClick={(e) => e.stopPropagation()}>
                    <h1 className='modal__title'>New List Details</h1>
                    <div className='modal__list'>
                        <div className='modal__list-name'>
                            <label className='modal__list-name--label' htmlFor="list_name">Name:</label>
                            <input className='modal__list-name--field' ref={list_name} type="text" name="list_name" id="list_name" />
                        </div>

                        <div className='modal__list-type'>
                            <label className='modal__list-type--label' htmlFor="list_type">List Type:</label>
                            <select className='modal__list-type--field' name="type_options" id="list_type">
                                <option value="Grocery">Grocery</option>
                                <option value="Routine">Routine</option>
                                <option value="Generic List">Generic List</option>
                            </select>
                        </div>
                    </div>
                    <p className='modal__add-button' onClick ={handleAddClick}>Add</p>
                </form>
            </div>
            </>
        )
}

export default AddListModal