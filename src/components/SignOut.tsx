import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
} from '../hooks/redux';
import { deleteUserSlice } from '../redux/slices/userSlice';

function SignOut() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(deleteUserSlice());
    navigate('/');
  }, []);
  return null;
}

export default SignOut;
