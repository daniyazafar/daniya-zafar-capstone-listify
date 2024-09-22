import { Link } from 'react-router-dom';
import './UserOptions.scss'

function UserOptions({ onLinkClick }) {
    return (
        <div className='options'>
            <div className='options__item'>
                <ul className="options__list">
                    <Link to='/' className="options__link" onClick={onLinkClick}>
                        <li className="options__list--item">USER ACCOUNT</li>
                    </Link>
                    <Link to='/' className="options__link" onClick={onLinkClick}>
                        <li className="options__list--item">SETTINGS</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default UserOptions;
