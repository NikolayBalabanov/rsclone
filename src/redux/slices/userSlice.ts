import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState } from '../../types/IState';
import { IUser } from '../../types/IUser';
import { editUser, signIn } from '../ac/user.ac';
import getInitState from '../initState';

const userSlice = createSlice({
  name: 'user',
  initialState: getInitState() as IState,
  reducers: {
    setUserSlice: (state, action) => ({ ...state, ...action.payload }),
    removeUserError: (state) => { state.error = ''; },
    deleteUserSlice: (state) => {
      state.isLoading = false;
      state.error = '';
      state.user = null;
    },

  },
  extraReducers: {
    [signIn.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [signIn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [editUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload;
    },
    [editUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [editUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setUserSlice, deleteUserSlice, removeUserError } = userSlice.actions;
export default userSlice.reducer;
