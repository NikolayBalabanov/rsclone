import {
  Navigate,
} from 'react-router-dom';

import { useAppSelector } from '../hooks/redux';

export type ProtectedRouteProps = {
  children: JSX.Element;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAppSelector((state) => state.userSlice);
  if (user?.userName === null || !user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
