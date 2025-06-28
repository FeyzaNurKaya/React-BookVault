import { Navigate } from 'react-router-dom';
import { authService } from '../services/api';
import type { ReactNode } from 'react';

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = authService.isAuthenticated();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
} 