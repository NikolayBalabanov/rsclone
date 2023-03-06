import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICadsState, ICardAPI } from '../../types/ICard';
import {
  createCard, deleteCard, getAllCards, getCardById, updateCard,
} from '../ac/card.ac';

const initialState: ICadsState = {
  cards: [],
  isLoading: false,
  error: '',
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    resetCardsError: (state) => { state.error = ''; },
  },
  extraReducers: {
    [getAllCards.fulfilled.type]: (state, action: PayloadAction<ICardAPI[]>) => {
      state.isLoading = false;
      state.error = '';
      state.cards = Array.isArray(action.payload) ? action.payload : [];
    },
    [getAllCards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllCards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getCardById.fulfilled.type]: (state, action: PayloadAction<ICardAPI>) => {
      state.isLoading = false;
      state.error = '';
      const cardIndex = state.cards
        .findIndex((card) => card.id === action.payload.id);
      state.cards[cardIndex] = action.payload;
    },
    [getCardById.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getCardById.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [createCard.fulfilled.type]: (state, action: PayloadAction<ICardAPI>) => {
      state.isLoading = false;
      state.error = '';
      state.cards = [...state.cards, action.payload];
    },
    [createCard.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createCard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateCard.fulfilled.type]: (state, action: PayloadAction<ICardAPI>) => {
      state.isLoading = false;
      state.error = '';
      state.cards = [...state.cards]
        .map((card) => (card.id === action.payload.id
          ? action.payload
          : card));
    },
    [updateCard.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateCard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteCard.fulfilled.type]: (state, action: PayloadAction<ICardAPI>) => {
      state.isLoading = false;
      state.error = '';
      state.cards = [...state.cards]
        .filter((card) => (card.id !== action.payload.id));
    },
    [deleteCard.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteCard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default cardSlice.reducer;
export const { resetCardsError } = cardSlice.actions;
