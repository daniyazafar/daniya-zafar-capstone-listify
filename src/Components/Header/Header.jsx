import { useLocation, Link, matchPath } from 'react-router-dom';
import { useState, useEffect } from 'react';
import menuIcon from '../../assets/icons/menu.svg';
import logo from '../../assets/icons/logo.png';
import userIcon from '../../assets/icons/user.svg';
import './Header.scss';
import UserOptions from '../UserOptions/UserOptions';
import MenuOptions from '../MenuOptions/MenuOptions';

function Header() {
    const location = useLocation();
    const matchListPath = matchPath('/lists/:listId', location.pathname);
    const matchOrganizedPath = matchPath('/lists/:listId/organized', location.pathname);

    const showUserIcon = location.pathname !== '/' && location.pathname !== '/signup';
    const showMenuIcon = matchListPath || matchOrganizedPath;
    const showAnimation = location.pathname === '/';
    const headerClass = showAnimation ? 'header' : 'header header--no-animation';

    const [showUserOptions, setShowUserOptions] = useState(false);
    const [showMenuOptions, setShowMenuOptions] = useState(false);

    const handleUserIconClick = () => {
        setShowUserOptions(!showUserOptions);
        setShowMenuOptions(false);
    };

    const handleMenuClick = () => {
        setShowMenuOptions(!showMenuOptions);
        setShowUserOptions(false);
    };

    const handleUserIconLinkClick = () => {
        setShowUserOptions(false);
    };

    const handleMenuLinkClick = () => {
        setShowMenuOptions(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const userModal = document.querySelector('.options');
            const menuModal = document.querySelector('.menu-options');
            const userIcon = document.querySelector('.header__user-icon');
            const menuIconEl = document.querySelector('.header__menu');
            if (
                (userModal && !userModal.contains(event.target) && !userIcon.contains(event.target)) ||
                (menuModal && !menuModal.contains(event.target) && !menuIconEl.contains(event.target))
            ) {
                setShowUserOptions(false);
                setShowMenuOptions(false);
            }
        };
        if (showUserOptions || showMenuOptions) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [showUserOptions, showMenuOptions]);

    return (
        <>
            <div className={headerClass}>
                {showMenuIcon && (
                    <img src={menuIcon} onClick={handleMenuClick} className='header__menu' alt='menu icon' />
                )}
                <Link to='/lists'>
                    {showAnimation ? (
                        <img className='header__logo' src={logo} alt='Listify Logo' />
                    ) : (
                        <img className='header__logo--no-animation' src={logo} alt='Listify Logo' />
                    )}
                </Link>
                {showUserIcon && (
                    <img onClick={handleUserIconClick} className='header__user-icon' src={userIcon} alt='user account icon' />
                )}
            </div>

            {showUserOptions && <UserOptions onLinkClick={handleUserIconLinkClick} />}
            {showMenuOptions && <MenuOptions onLinkClick={handleMenuLinkClick} />}
        </>
    );
}

export default Header;
