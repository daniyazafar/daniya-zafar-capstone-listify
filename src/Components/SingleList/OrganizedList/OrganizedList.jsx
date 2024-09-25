import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Api } from "../../../../utils/utils.js";
import backArrow from "../../../../src/assets/icons/back.svg";
import refreshIcon from "../../../../src/assets/icons/refresh.svg";
import checkMark from "../../../../src/assets/icons/checkmark.svg";
import darkCheckMark from "../../../../src/assets/icons/dark-checkmark.svg";
import './OrganizedList.scss';

function OrganizedList() {
    const api = new Api();
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const { categorizedItems = [], listDetails = {} } = location.state || {};
    const [organizedList, setOrganizedList] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const toggleCheckmark = (categoryIndex, itemIndex, wordIndex) => {
        const updatedList = [...organizedList];
        const selectedItem = updatedList[categoryIndex].items[itemIndex].item[wordIndex];

        if (typeof selectedItem === 'string') {
            updatedList[categoryIndex].items[itemIndex].item[wordIndex] = {
                name: selectedItem,
                is_checked: false
            };
        } else {
            updatedList[categoryIndex].items[itemIndex].item[wordIndex].is_checked = !updatedList[categoryIndex].items[itemIndex].item[wordIndex].is_checked;
        }
        setOrganizedList(updatedList);
    };

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);
            const response = await api.organizeList(params.id);
            const newCategorizedItems = Object.entries(response).map(([key, value]) => {
                return {
                    category: key,
                    items: Object.entries(value).map(([subKey, subValue]) => {
                        return {
                            subcategory: subKey,
                            item: Array.isArray(subValue) ? subValue.map(item => ({ name: item, is_checked: false })) : subValue.split('\n').map(item => ({ name: item, is_checked: false }))
                        };
                    })
                };
            });
            setOrganizedList(newCategorizedItems);
            setIsRefreshing(false);
        } catch (error) {
            setIsRefreshing(false);
            console.error("Failed to refresh list", error);
        }
    };

    useEffect(() => {
        const categorizedItem = categorizedItems.map((categorizedItem) => {
            return {
                category: categorizedItem.category,
                items: categorizedItem.items.map((item) => {
                    return {
                        subcategory: item.subcategory,
                        item: Array.isArray(item.item)
                            ? item.item.map(i => (typeof i === 'string' ? { name: i, is_checked: false } : i))
                            : item.item.split('\n').map(i => ({ name: i, is_checked: false }))
                    };
                })
            };
        });
        setOrganizedList(categorizedItem);
    }, [categorizedItems]);

    return (
        <div>
            <div className="list__header">
                <img className="list__header--icon" src={backArrow} onClick={() => navigate(-1)} alt="back arrow" />
                <h1>{listDetails.name} - {listDetails.type}</h1>
                <img className="list__header--icon" src={refreshIcon} onClick={handleRefresh} alt="refresh button" />
            </div>
            <div className='organized__list'>
                {organizedList.length > 0 ? (
                    organizedList.map((categoryObj, categoryIndex) => (
                        <div key={categoryIndex}>
                            <h3>{categoryObj.category}</h3>
                            <ul className="organized__list-category">
                                {categoryObj.items.map((itemObj, itemIndex) => (
                                    <div key={itemIndex}>
                                        {itemObj.item.map((word, wordIndex) => (
                                            <li 
                                                key={wordIndex} 
                                                className={`organized__list-item ${word.is_checked ? 'active' : ''}`}
                                                onClick={() => toggleCheckmark(categoryIndex, itemIndex, wordIndex)}
                                            >
                                                <img 
                                                    className="organized__list-checkmark" 
                                                    src={word.is_checked ? darkCheckMark : checkMark} 
                                                    alt="checkmark" 
                                                />
                                                <span>{word.name || word}</span>
                                            </li>
                                        ))}
                                    </div>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>No items to display</p>
                )}
            </div>

            {isRefreshing && (
                <div className="sparkle-overlay">
                    {[...Array(150)].map((_, index) => (
                        <div key={index} className={`sparkle sparkle-${index + 1}`}></div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrganizedList;
