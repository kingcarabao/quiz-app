import React, { createContext, useReducer, useEffect } from 'react';
import { localHttp } from '../../utils/axios';
import useChildrenSpawner from '../../hooks/useChildrenSpawner';
import { JWTContextType, AuthLogin } from '../../@types/authenticate';
import { JWTReducer, JWTInitialState } from './reducer';
import { isValidToken, setSession } from '../../utils/jwt';

const JWTContext = createContext<JWTContextType>({
  isAuthenticated: false,
  login: null,
});

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const spawns = useChildrenSpawner(children);
  const [state, dispatch] = useReducer(JWTReducer, JWTInitialState);
  const { isAuthenticated } = state;

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await localHttp.get('/users');
          const { user } = response.data;
          console.log(user);
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
              token: accessToken,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  /**
   * Login method
   */
  const login = async (values: AuthLogin) => {
    try {
      const response = await localHttp.post('/users/login', values);
      const { success, user, token } = response.data;

      if (success) {
        const payload = {
          user,
          token,
        };
        dispatch({ type: 'LOGIN', payload });
        setSession(token);
        return [user, null];
      }
      return [null, new Error('Login failed')];
    } catch (err: any) {
      return [null, new Error(`Login failed: ${err.message}`)];
    }
  };

  /**
   * Here's the Provider
   */
  return (
    <JWTContext.Provider
      value={{
        isAuthenticated,
        login,
      }}
    >
      {spawns}
    </JWTContext.Provider>
  );
}

export { JWTContext, AuthProvider };
