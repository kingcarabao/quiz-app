import axios from '../../utils/axios';
import React, { createContext, useReducer, useState, useEffect } from 'react';
import useChildrenSpawner from '../../hooks/useChildrenSpawner';
import { JWTContextType, AuthLogin } from '../../@types/authenticate';
import { JWTReducer, JWTInitialState } from './reducer';

const JWTContext = createContext<JWTContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const spawns = useChildrenSpawner(children);
  const [state, dispatch] = useReducer(JWTReducer, JWTInitialState);
  const { isAuthenticated } = state;

  const login = async (values: AuthLogin) => {
    try {
      const response = await axios.post('/users/login', values);
      const { success, user, token } = response.data;

      if (success) {
        const payload = {
          user: user,
          token: token,
        };
        dispatch({ type: "LOGIN", payload });
        return [user, null];
      } else {
        return [null, new Error('Login failed')];
      }
    } catch (err: any) {
      console.log(err);
      return [null, new Error(`Login failed: ${err.message}`)];
    }
  };

  /**
   * Here's the Provider
   */
  return (
    <JWTContext.Provider value={{
      isAuthenticated,
      login
    }}>
      {children}
    </JWTContext.Provider>
  );
}

export { JWTContext, AuthProvider };