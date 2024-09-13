import { ReactSVG } from "react-svg";
import logo from '../../assets/icons/logo.png';
import menuIcon from '../../assets/icons/menu.svg'
import userIcon from '../../assets/icons/user.svg'

import './Header.scss'

function Header() {
    return (
        <>
        <div className="header">
            <div className="empty"></div>
            <img className='header__logo' src={logo} alt="Listify Logo" />
            <img src={userIcon} alt="user account icon" />
        </div>
        </>
    )
}

export default Header