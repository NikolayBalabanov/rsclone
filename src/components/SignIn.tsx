import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signIn } from '../redux/ac/user.ac';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { removeUserError } from '../redux/slices/userSlice';

function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { error, isLoading, user } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Sign in';
  }, []);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
    setIsValidPassword(e.target.value.trim().length > 0);
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    setIsValidEmail(value !== ''
      // eslint-disable-next-line no-useless-escape
      && /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i.test(value));
  };
  if (error) {
    Swal.fire(error);
    dispatch(removeUserError());
  }
  if (!isLoading && user) {
    navigate('/boards');
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(signIn({ email, password }));
  };

  return (
    <div className="w-full sm:w-1/2 py-4 m-auto">
      <form id="singIn" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-colorD1" onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-colorD3" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border ${isValidEmail ? '' : 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-colorD2 dark:text-colorD3`}
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            autoComplete="email"
            onChange={handleEmailChange}
            value={email}
          />
          {!isValidEmail && <p className="text-red-500 text-xs italic">Please enter an email.</p>}
        </div>
        <div className="mb-6">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-colorD3" htmlFor="password">
            Password
          </label>
          <input
            className={`shadow appearance-none border ${isValidPassword ? '' : 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-colorD2 dark:text-colorD3`}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="******************"
            onChange={handlePasswordChange}
            value={password}
          />
          {!isValidPassword && <p className="text-red-500 text-xs italic">Please enter a password.</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            id="confirmLogin"
            className="btn btn-primary disabled:opacity-25"
            type="submit"
            disabled={!(isValidEmail && isValidPassword)}
          >
            Sign In
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-colorD4 dark:hover:text-blue-800"
            onClick={() => navigate('/signup')}
            type="button"
          >
            or Sing up
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs dark:text-colorD3">
        &copy;2023 RS School. All rights reserved.
      </p>
    </div>
  );
}

export default SignIn;
