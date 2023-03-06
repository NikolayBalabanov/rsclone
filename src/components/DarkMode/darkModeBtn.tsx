/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAppDispatch } from '../../hooks/redux';
import { setDark } from '../../redux/slices/themeSlice';
import useDarkMode from './useDarkMode';

function Dark() {
  const dispatch = useAppDispatch();
  const handleChangeTheme = () => {
    const root = window.document.documentElement as HTMLElement;
    dispatch(setDark(!root.classList.contains('dark')));
    useDarkMode();
  };
  return (
    <div className="flex flex-col justify-center">
      <span className="cursor-pointer" onClick={() => handleChangeTheme()}>
        <svg className="w-6 h-6 dark:text-colorD3 text-color1 duration-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
          <path clipRule="evenodd" fillRule="evenodd" d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z" />
        </svg>
      </span>
    </div>
  );
}
export default Dark;
