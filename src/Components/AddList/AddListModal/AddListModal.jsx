import { useRef } from 'react';

import './AddListModal.scss';

function AddListModal({ modal, closeModal, addNewList }) {
    
    const list_name = useRef();

    if (!modal) return null;

    const handleAddClick = () => {
        closeModal();
        const new_list_name = list_name.current.value;
        addNewList(new_list_name);
        console.log(list_name.current.value);
    };
    

        return (
            <>
            <form action="">
                <h1>Add New List</h1>
                <label htmlFor="list_name">Name:</label>
                <input ref={list_name} type="text" name="list_name" id="list_name" />
                <label htmlFor="list_type">List Type:</label>
                <select name="type_options" id="list_type">
                    <option value="Grocery">Grocery</option>
                    <option value="Bedtime Routine">Bedtime Routine</option>
                    <option value="Morning Routine">Morning Routine</option>
                    <option value="Generic List">Generic List</option>
                </select>

                <p onClick ={handleAddClick}>Add</p>
            </form>
                {/* <div>AddListModal</div>
                <span onClick={closeModal}>x</span> */}
            </>
        )
}

// export const newList = {list_name.value};

export default AddListModal