import React, { useReducer } from 'react';
import { JWTContextType, AuthState, AuthUser, AuthPayload } from '../../@types/authenticate';

const JWTInitialState: AuthState = {
    user: {
        userName: '',
        userEmail: '',
        userType: 'client',
        userInfo: {
            firstName: '',
            lastName: '',
            middleName: '',
        }
    },
    token: null,
    isAuthenticated: false,
};

const JWTReducer = (state: AuthState, action: any ) => { 
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            }
        }
        default:
            throw new Error();
    }
};

export { JWTReducer, JWTInitialState };