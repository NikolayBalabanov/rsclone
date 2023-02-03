import Swal from 'sweetalert2';
import * as endPoints from '../../config/endPoints';
import { setUserSlice } from '../slices/userSlice';

// eslint-disable-next-line import/prefer-default-export,consistent-return
export const signIn = (payload: any, navigate: any) => async (dispatch: any) => {
  const response = await fetch(endPoints.signIn(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUserSlice(user));
    return navigate('/');
  }
  Swal.fire('Неправильный логин / пароль');
};
