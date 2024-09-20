import { useLocation, Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.png';
import userIcon from '../../assets/icons/user.svg';

import './Header.scss'

function Header() {
    const location = useLocation();

    const showUserIcon = location.pathname !== '/' && location.pathname !== '/signup';
    const showAnimation = location.pathname === '/';

    return (
        <div className="header">
            <div className='header__empty'></div>
            {showAnimation ? (<img className='header__logo' src={logo} alt="Listify Logo" />) : (<img className='header__logo--no-animation' src={logo} alt="Listify Logo" />)}
            <div className='header__empty'></div>
            {showUserIcon && (<img className='header__user' src={userIcon} alt="user account icon" />)}
        </div>
    );
}

export default Header;
