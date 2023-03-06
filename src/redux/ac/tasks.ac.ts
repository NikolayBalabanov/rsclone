import { createAsyncThunk } from '@reduxjs/toolkit';
import Toast from '../../components/UI/toast';
import * as endPoints from '../../config/endPoints';
import {
  IColumnTasks, ITask, ITaskCreate, ITaskDelete, ITaskReorderParam, ITaskUpdate,
} from '../../types/IColumnTasks';

const getColumnTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (payload: string, thunkAPI) => {
    try {
      const res = await fetch(endPoints.columns() + payload, {
        credentials: 'include',
      });
      if (res.ok) {
        const result: IColumnTasks = await res.json();
        return { col: payload, response: result };
      }
      throw new TypeError('Tasks loading error');
    } catch (error) {
      if (error instanceof TypeError) {
        return thunkAPI.rejectWithValue(error?.message);
      }
      return thunkAPI.rejectWithValue('Some problem in getColumnTasks');
    }
  },
);

const createTask = createAsyncThunk(
  'tasks/create',
  async (payload: ITaskCreate, thunkAPI) => {
    try {
      const res = await fetch(endPoints.tasks(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result: ITask = await res.json();
        return result;
      }
      throw new TypeError('Task creating error');
    } catch (error) {
      if (error instanceof TypeError) {
        return thunkAPI.rejectWithValue(error?.message);
      }
      return thunkAPI.rejectWithValue('Some problem in createTask');
    }
  },
);

const updateTask = createAsyncThunk(
  'tasks/update',
  async (payload: ITaskUpdate, thunkAPI) => {
    try {
      const res = await fetch(endPoints.tasks() + payload.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const result = await res.json();
        Toast.fire({
          icon: 'success',
          title: result,
        });
        return payload;
      }
      throw new TypeError('Task updating error');
    } catch (error) {
      if (error instanceof TypeError) {
        return thunkAPI.rejectWithValue(error?.message);
      }
      return thunkAPI.rejectWithValue('Some problem in updateTask');
    }
  },
);

const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (payload: ITaskDelete, thunkAPI) => {
    try {
      const res = await fetch(endPoints.tasks() + payload.id, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        return payload;
      }
      throw new TypeError('Task deleting error');
    } catch (error) {
      if (error instanceof TypeError) {
        return thunkAPI.rejectWithValue(error?.message);
      }
      return thunkAPI.rejectWithValue('Some problem in updateTask');
    }
  },
);

const setTasksOrder = createAsyncThunk(
  'columns/setOrder',
  async (payload: ITaskReorderParam[], thunkAPI) => {
    try {
      const res = await fetch(endPoints.setTasksOrder(), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new TypeError('Task reordering error');
      }
      return res.statusText;
    } catch (error) {
      if (error instanceof TypeError) {
        return thunkAPI.rejectWithValue(error?.message);
      }
      return thunkAPI.rejectWithValue('Some problem in setTasksOrder');
    }
  },
);

export {
  deleteTask, updateTask, createTask, getColumnTasks, setTasksOrder,
};
