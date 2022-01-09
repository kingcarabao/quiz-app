import React, { useContext } from 'react';
import { JWTContext } from '../contexts/AuthContext/JWTContext';

export default function useAuth() {
  const context = useContext(JWTContext);
  const error = null;

  if (!context) {
    new Error('Auth context must be used inside AuthProvider');
  }

  return [context, error];
}
