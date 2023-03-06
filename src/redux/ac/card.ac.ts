import { createAsyncThunk } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import * as endPoints from '../../config/endPoints';
import { ICardAPI, ICreateCard } from '../../types/ICard';

const getAllCards = createAsyncThunk(
  'сards/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await fetch(endPoints.cards(), {
        credentials: 'include',
      });
      if (res.ok) {
        const result = await res.json();
        return result;
      }
      await Swal.fire('Oops! There is problem with authorization. Please login again');
      throw new Error('authorization problem');
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error?.message);
      }
      return thunkAPI.rejectWithValue('Some problem in GetAllCards');
    }
  },
);

const getCardById = createAsyncThunk(
  'cards/fetchOne',
  async (payload: string, thunkAPI) => {
    try {
      const res = await fetch(endPoints.cards() + payload, {
        credentials: 'include',
      });
      if (res.ok) {
        const result = await res.json();
        return result;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так при получении 1го борда');
    }
  },
);

const createCard = createAsyncThunk(
  'cards/create',
  async (payload: ICreateCard, thunkAPI) => {
    try {
      const res = await fetch(endPoints.cards(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        await Swal.fire('The board was successfuly created!');
        return result;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так при созадании борды');
    }
  },
);

const updateCard = createAsyncThunk(
  'cards/update',
  async (payload: ICardAPI, thunkAPI) => {
    try {
      const res = await fetch(endPoints.cards() + payload.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        await Swal.fire(result);
        return payload;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Что-то пошло не так при редактировании');
    }
  },
);

const deleteCard = createAsyncThunk(
  'cards/delete',
  async (payload: ICardAPI, thunkAPI) => {
    try {
      const res = await fetch(endPoints.cards() + payload.id, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        await Swal.fire('Board deleted');
        return payload;
      }
      return await Swal.fire(res.statusText);
    } catch (error) {
      return thunkAPI.rejectWithValue('Oops! Board delete error');
    }
  },
);

export {
  getAllCards, getCardById, createCard, updateCard, deleteCard,
};
