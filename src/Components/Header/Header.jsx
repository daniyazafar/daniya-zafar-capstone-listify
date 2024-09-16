import { useLocation } from 'react-router-dom';

import logo from '../../assets/icons/logo.png';
import userIcon from '../../assets/icons/user.svg';

import './Header.scss'

function Header() {
    const location = useLocation();

    const showUserIcon = location.pathname != '/' && location.pathname != '/signup';

    return (
        <>
        <div className="header">
            <div className="empty"></div>
            <img className='header__logo' src={logo} alt="Listify Logo" />
            {!showUserIcon && <div className="empty"></div>}
            {showUserIcon && <img className='header__user' src={userIcon} alt="user account icon" />}
        </div>
        </>
    )
}

export default Header