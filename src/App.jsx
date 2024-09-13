import { ReactSVG } from "react-svg";
import logo from './assets/icons/logo.svg';

import './App.scss';

function App() {
  return (
    <>
    <div className="header">
      <ReactSVG className='header__logo' src={logo} />
    </div>

    </>
  );
}

export default App;
