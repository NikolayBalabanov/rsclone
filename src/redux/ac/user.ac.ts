import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import Toast from '../../components/UI/toast';
import * as endPoints from '../../config/endPoints';
import { IUserCreate, IUserInfo } from '../../types/IUser';

const signIn = createAsyncThunk(
  'user/fetchAll',
  async (payload: IUserInfo, thunkAPI) => {
    try {
      const res = await fetch(endPoints.signIn(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (error) {
      return thunkAPI.rejectWithValue('Неправильный логин / пароль');
    }
  },
);

const signUp = createAsyncThunk(
  'user/createNew',
  async (payload: IUserCreate, thunkAPI) => {
    try {
      const res = await fetch(endPoints.signUp(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        await Swal.fire(result);
        return result;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так');
    }
  },
);

const editUser = createAsyncThunk(
  'user/editUser',
  async (payload: FormData, thunkAPI) => {
    try {
      const res = await fetch(endPoints.editUser() + payload.get('id'), {
        method: 'PATCH',
        credentials: 'include',
        body: payload,
      });
      if (res.ok) {
        const result = await res.json();
        Toast.fire({
          icon: 'success',
          title: 'Successfully!',
        });
        return result;
      }
      throw new TypeError('User update error');
    } catch (error) {
      if (error instanceof TypeError) {
        return thunkAPI.rejectWithValue(error?.message);
      }
      return thunkAPI.rejectWithValue('Some problem in editUser');
    }
  },
);

export { signIn, signUp, editUser };
