import { Link } from 'react-router-dom';
import logo2 from '../images/add-file.svg';
import ava from '../images/avaDefault.jpg';
import { useAppSelector } from '../hooks/redux';
import Dark from './DarkMode/darkModeBtn';

export function disActivateBurger() {
  const burgerMenu = document.getElementById('navbarNavAltMarkup') as HTMLButtonElement;
  const burgerBtn = document.getElementById('burger') as HTMLButtonElement;
  document.body.classList.remove('overflow-hidden');
  burgerMenu.classList.remove('menu-active');
  burgerBtn.classList.remove('_active');
}
function activateBurger() {
  const burgerBtn = document.getElementById('burger') as HTMLButtonElement;
  const burgerMenu = document.getElementById('navbarNavAltMarkup') as HTMLButtonElement;
  document.body.classList.toggle('overflow-hidden');
  burgerBtn.classList.toggle('_active');
  burgerMenu.classList.toggle('menu-active');
}

function NavBarLogged() {
  const { user } = useAppSelector((state) => state.userSlice);
  return (
    <nav className="bg-color5 md:px-9 px-2 py-3 dark:bg-colorD1 dark:text-colorD3">
      <div className="flex justify-between items-center">
        <img className="md:w-14 w-7" id="logoNavBar" src={logo2} alt="" />
        <button
          className="lg:hidden menu-icon before:dark:bg-colorD3 after:dark:bg-colorD3"
          type="button"
          id="burger"
          onClick={() => activateBurger()}
        >
          <span className="dark:bg-colorD3 " />
        </button>
        <div className="menu-container menu lg:translate-x-0" id="navbarNavAltMarkup" onClick={() => disActivateBurger()} onKeyDown={() => disActivateBurger()} role="presentation">
          <div className="menu-content" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()} role="presentation">
            <div className="flex items-center">
              <Link className="btn boards" to="/boards" onClick={() => disActivateBurger()}>
                All boards
              </Link>
            </div>
            <div className="flex items-center">
              <Link className="btn main" aria-current="page" to="/" onClick={() => disActivateBurger()}>Main page</Link>
            </div>
            <div className="flex items-center">
              <Link className="btn edit" aria-current="page" to="/editprofile" onClick={() => disActivateBurger()}>Edit profile</Link>
            </div>
            <div className="flex items-center md:text-base text-xs">
              Logged as
              {` ${user?.userName}`}
            </div>
            <div>
              <img id="avatar" src={user?.avatar || ava} alt="user avatar" />
            </div>
            <div className="flex items-center">
              <Link className="btn logout" to="logout" onClick={() => disActivateBurger()}>Sing out</Link>
            </div>
            <Dark />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBarLogged;
