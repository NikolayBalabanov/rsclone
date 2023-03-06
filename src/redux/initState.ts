import { IState } from '../types/IState';

const initState: IState = {
  user: null,
  isLoading: false,
  error: null,
};

const getInitState = () => {
  const stateFromLS = window.localStorage.getItem('redux');
  if (typeof stateFromLS === 'string') {
    return JSON.parse(stateFromLS);
  }
  return initState;
};

export default getInitState;
