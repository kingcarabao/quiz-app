import { AuthState } from '../../@types/authenticate';

const JWTInitialState: AuthState = {
  user: {
    userName: '',
    userEmail: '',
    userType: 'client',
    userInfo: {
      firstName: '',
      lastName: '',
      middleName: '',
    },
  },
  token: null,
  isAuthenticated: false,
};

const JWTReducer = (state: AuthState, action: any) => {
  switch (action.type) {
    case 'INITIALIZE': {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case 'LOGIN': {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    default:
      throw new Error();
  }
};

export { JWTReducer, JWTInitialState };
