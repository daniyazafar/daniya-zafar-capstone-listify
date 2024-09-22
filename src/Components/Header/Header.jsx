import { useLocation, Link } from 'react-router-dom';
import menuIcon from '../../assets/icons/menu.svg';
import logo from '../../assets/icons/logo.png';
import userIcon from '../../assets/icons/user.svg';

import './Header.scss'

function Header() {
    const location = useLocation();

    const showUserIcon = location.pathname !== '/' && location.pathname !== '/signup';
    const showMenuIcon = location.pathname !== '/' && location.pathname !== '/signup';
    const showAnimation = location.pathname === '/';
    const headerClass = showAnimation ? 'header' : 'header header--no-animation';

    return (
        <div className={headerClass}>
            {showMenuIcon && (<img src={menuIcon} className='header__menu' alt='menu icon' />)}
            <Link to='/home'>{showAnimation ? (<img className='header__logo' src={logo} alt="Listify Logo" />) : (<img className='header__logo--no-animation' src={logo} alt="Listify Logo" />)}</Link>
            {showUserIcon && (<img className='header__user' src={userIcon} alt="user account icon" />)}
        </div>
    );
}

export default Header;
