import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Api } from '../../../utils/utils.js';
import './MenuOptions.scss';

function MenuOptions({ onLinkClick }) {
    const api = new Api();
    const [allLists, setAllLists] = useState([]);

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
    }, []);

    return (
        <div className='menu-options'>
            <div className='menu-options__item'>
                <ul className="menu-options__list">
                    {allLists.map((list, index) => (
                        <Link 
                            to={`/lists/${list.id}`} 
                            key={index} 
                            className="menu-options__link" 
                            onClick={onLinkClick}
                        >
                            <li className="menu-options__list--item">
                                {list.name} - {list.type}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MenuOptions;
