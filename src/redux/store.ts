import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import getInitState from './initState';

export const setupStore = () => configureStore({
  reducer: rootReducer,
  devTools: true,
  preloadedState: getInitState(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
const store = setupStore();

store.subscribe(() => {
  window.localStorage.setItem('redux', JSON.stringify(store.getState()));
});

export default store;
export type RooteState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
