/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { signUp } from '../redux/ac/user.ac';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [passwordOne, setPasswordOne] = useState<string>('');
  const [passwordTwo, setPasswordTwo] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isValidUserName, setIsValidUserName] = useState<boolean>(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidPasswordOne, setIsValidPasswordOne] = useState<boolean>(false);
  const [isValidPasswordTwo, setIsValidPasswordTwo] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((state) => state.userSlice);
  useEffect(() => {
    document.title = 'Sign Up';
  }, []);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value.trim());
    setIsValidUserName(e.target.value.trim().length > 2);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'passwordOne') {
      setPasswordOne(e.target.value.trim());
      setIsValidPasswordOne(e.target.value.trim().length > 0);
    } else {
      setPasswordTwo(e.target.value.trim());
      setIsValidPasswordTwo(e.target.value.trim().length > 0);
    }
  };
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    setIsValidEmail(value !== ''
      // eslint-disable-next-line no-useless-escape
      && /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/i.test(value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (passwordOne !== passwordTwo) {
      await Swal.fire('Passwords are not equal');
    } else {
      console.log(userName, email, passwordOne, passwordTwo);
      console.log({
        userName,
        email,
        password: passwordOne,
        password2: passwordTwo,
      });
      await dispatch(signUp({
        userName,
        email,
        password: passwordOne,
        password2: passwordTwo,
      }));
      if (error) {
        await Swal.fire(error || 'Wrong login / password');
      } else {
        navigate('/login');
      }
    }
  };

  return (
    <div className="w-full sm:w-1/2 py-4 m-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-colorD1" onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-colorD3" htmlFor="userName">
            User name
          </label>
          <input
            className={`shadow appearance-none border ${isValidUserName ? '' : 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-colorD3 dark:bg-colorD2`}
            id="userName"
            name="userName"
            type="text"
            placeholder="Name"
            autoComplete="userName"
            onChange={handleNameChange}
            value={userName}
          />
          {!isValidUserName && <p className="text-red-500 text-xs italic">Please enter User name.</p>}
        </div>
        <div className="mb-4">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-colorD3" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border ${isValidUserName ? '' : 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-colorD3 dark:bg-colorD2`}
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            autoComplete="email"
            onChange={handleEmailChange}
            value={email}
          />
          {!isValidUserName && <p className="text-red-500 text-xs italic">Please enter an email.</p>}
        </div>
        <div className="mb-6">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-colorD3" htmlFor="password">
            Password
          </label>
          <input
            className={`shadow appearance-none border ${isValidUserName ? '' : 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-colorD3 dark:bg-colorD2`}
            id="passwordOne"
            name="passwordOne"
            type="password"
            placeholder="******************"
            autoComplete="new-password"
            onChange={handlePasswordChange}
            value={passwordOne}
          />
          {!isValidUserName && <p className="text-red-500 text-xs italic">Please enter a password</p>}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-colorD3" htmlFor="password2">
            Password one more time
          </label>
          <input
            className={`shadow appearance-none border ${isValidUserName ? '' : 'border-red-500'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-colorD3 dark:bg-colorD2`}
            id="passwordTwo"
            name="passwordTwo"
            type="password"
            placeholder="******************"
            autoComplete="new-password"
            onChange={handlePasswordChange}
            value={passwordTwo}
          />
          <p className="text-red-500 text-xs italic">Please enter the password one more time.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="btn btn-primary disabled:opacity-25"
            type="submit"
            disabled={!(isValidEmail
              && isValidPasswordOne
              && isValidPasswordTwo
              && isValidUserName)}
          >
            Sign Up
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 dark:text-colorD4 dark:hover:text-blue-800"
            onClick={() => navigate('/login')}
            type="button"
          >
            or Sing in
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs dark:text-colorD3">
        &copy;2023 RS School. All rights reserved.
      </p>
    </div>
  );
}

export default SignUp;
