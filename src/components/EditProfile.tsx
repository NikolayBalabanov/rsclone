import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import Swal from 'sweetalert2';
import { editUser } from '../redux/ac/user.ac';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

function EditProfile() {
  const formData = new FormData();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (target && file) {
      formData.append('file', file);
    }
  };

  const dispatch = useAppDispatch();
  const {
    error,
    user,
  } = useAppSelector((state) => state.userSlice);
  const initialState = {
    userName: user?.userName,
    email: user?.email,
    id: user?.id,
    avatar: user?.avatar,
  };
  const [toSend, setToSend] = useState(initialState);
  useEffect(() => {
    document.title = 'Edit profile';
  }, []);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    formData.append('userName', toSend.userName!);
    formData.append('email', toSend.email!);
    formData.append('id', String(toSend.id!));
    await dispatch(editUser(formData));
    if (error) {
      await Swal.fire(error || 'Something went wrong');
    } else {
      formData.delete('userName');
      formData.delete('email');
      formData.delete('id');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setToSend({
      ...toSend,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full sm:w-1/2 py-4 m-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-colorD1"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2 dark:text-colorD3"
            htmlFor="userName"
          >
            User name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-colorD3 dark:bg-colorD1"
            id="userName"
            name="userName"
            type="text"
            placeholder="Name"
            autoComplete="userName"
            onChange={handleChange}
            value={toSend.userName}
          />
        </div>
        <div className="mb-4">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            className="block text-gray-700 text-sm font-bold mb-2 dark:text-colorD3"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-colorD3 dark:bg-colorD1"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            autoComplete="email"
            onChange={handleChange}
            value={toSend.email}
          />
        </div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          className="block text-gray-700 text-sm font-bold mb-2 dark:text-colorD3"
          htmlFor="avatar"
        >
          Avatar
        </label>
        <input
          type="file"
          name="file"
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 dark:text-colorD3 dark:bg-colorD1"
          aria-label="Upload"
          onChange={onFileChange}
        />
        <div className="flex items-center justify-center">
          <button
            className="btn btn-primary w-1/4"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
