import { Link } from 'react-router-dom';
import logo2 from '../images/add-file.svg';
import Dark from './DarkMode/darkModeBtn';

function NavBarStart() {
  return (
    <div className="my-0 bg-color5 md:px-9 px-2 py-3 dark:bg-colorD1">
      <nav>
        <div className="flex justify-between">
          <Link className="flex items-center" to="/">
            <img className="md:w-14 w-7" id="logoNavBar" src={logo2} alt="logo" />
            <button type="button">
              <span />
            </button>
          </Link>
          <div className="flex gap-7" id="navbarNavAltMarkup">
            <div className="flex items-center">
              <Link className="btn" id="login" to="login">Sing in</Link>
            </div>
            <div className="flex items-center">
              <Link className="btn" id="signup" to="signup">Sing up</Link>
            </div>
            <Dark />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBarStart;
