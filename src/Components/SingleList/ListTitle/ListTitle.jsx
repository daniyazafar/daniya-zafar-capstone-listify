import { useParams, Link, useNavigate } from 'react-router-dom';
import { Api } from "../../../../utils/utils.js";
import backArrow from "../../../../src/assets/icons/back.svg";
import './ListTitle.scss';

function ListTitle({ listDetails, handleBackClick }) {
    const api = new Api();
    const params = useParams();
    const navigate = useNavigate();

    const handleOrganizeClick = async () => {
        try {
            const response = await api.organizeList(params.id);
            const categorizedItems = Object.entries(response).map(([key, value]) => {
                return {
                    category: key,
                    items: Object.entries(value).map(([subKey, subValue]) => {
                        return {
                            subcategory: subKey,
                            item: subValue
                        };
                    })
                };
            });
    
            navigate(`/lists/${params.id}/organized`, { state: { categorizedItems, listDetails } });
        } catch (error) {
            console.error('Failed to organize list:', error);
        }
    };

    return (
        <div className="list__header">
            <Link to='/home' onClick={handleBackClick}>
                <img src={backArrow} alt="back arrow" />
            </Link>
            <h1>{listDetails.name} - {listDetails.type}</h1>
            <div className='list__header-button' onClick={handleOrganizeClick}>Organize</div>
        </div>
    );
}

export default ListTitle;