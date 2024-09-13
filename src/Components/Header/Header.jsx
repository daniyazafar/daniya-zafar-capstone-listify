import logo from '../../assets/icons/logo.png';
import userIcon from '../../assets/icons/user.svg'

import './Header.scss'

function Header() {
    return (
        <>
        <div className="header">
            <div className="empty"></div>
            <img className='header__logo' src={logo} alt="Listify Logo" />
            <img className='header__user' src={userIcon} alt="user account icon" />
        </div>
        </>
    )
}

export default Header