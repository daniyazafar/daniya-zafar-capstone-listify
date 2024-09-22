import ListItems from '../ListItems/ListItems';
import './ListArea.scss';

function ListArea({ items, handleEnterKey, handleItemClickEvent, item_ref }) {
    return (
        <div className="list__area">
            <ListItems 
                items={items}
                handleEnterKey={handleEnterKey}
                handleItemClickEvent={handleItemClickEvent}
                item_ref={item_ref}
            />
        </div>
    );
}

export default ListArea;