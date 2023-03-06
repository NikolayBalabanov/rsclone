import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IColumn,
  IColumnAPI, IColumnsState, IColumnUpdete,
} from '../../types/IColumnTasks';
import { orderSortCols } from '../../utils/orderSort';
import {
  createColumn, deleteColumn, getColumns, setColumnsOrder, updateColumn,
} from '../ac/column.ac';

const initialState: IColumnsState = {
  columns: [],
  isLoading: false,
  error: '',
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setColumns: (state, action) => ({ ...state, columns: action.payload }),
  },
  extraReducers: {
    [getColumns.fulfilled.type]: (state, action: PayloadAction<IColumnAPI>) => {
      state.isLoading = false;
      state.error = '';
      const prevArr = action.payload.Columns;
      state.columns = orderSortCols(prevArr);
    },
    [getColumns.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getColumns.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createColumn.fulfilled.type]: (state, action: PayloadAction<IColumn>) => {
      state.isLoading = false;
      state.error = '';
      state.columns.push(action.payload);
    },
    [createColumn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateColumn.fulfilled.type]: (state, action: PayloadAction<IColumnUpdete>) => {
      state.isLoading = false;
      state.error = '';
      const { columnTitle, id, order } = action.payload;
      state.columns = [...state.columns]
        .map((column) => {
          if (column.id === action.payload.id) {
            return {
              ...column, columnTitle, id, order,
            };
          }
          return column;
        });
    },
    [updateColumn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteColumn.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = '';
      state.columns = [...state.columns]
        .filter((column) => (column.id !== action.payload));
    },
    [deleteColumn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [setColumnsOrder.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },
    [setColumnsOrder.pending.type]: (state) => {
      state.isLoading = true;
    },
    [setColumnsOrder.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default columnSlice.reducer;
export const { setColumns } = columnSlice.actions;
