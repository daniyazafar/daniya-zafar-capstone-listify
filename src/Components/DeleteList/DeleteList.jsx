import './DeleteList.scss';

function DeleteList({ modal, closeModal, handleDelete }) {
    if (!modal) return null;

    return (
        <div className='delete-modal-overlay' onClick={closeModal}>
            <div className='delete-modal' onClick={(event) => event.stopPropagation()}>
                <h1 className='delete-modal__title'>Delete List?</h1>
                <p className='delete-modal__message'>Are you sure you want to delete this list? This action cannot be undone. All items inside will also be deleted!</p>
                <div className='delete-modal__buttons'>
                    <button className='delete-modal__button delete-modal__button--confirm' onClick={handleDelete}>Delete</button>
                    <button className='delete-modal__button delete-modal__button--cancel' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteList;
