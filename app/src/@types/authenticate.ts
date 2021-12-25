export type AuthUser = {
    userName: string;
    userEmail: string;
    userType: 'admin' | 'client';
    userInfo: {
        firstName: string;
        lastName: string;
        middleName: string;
        dateOfBirth?: Date | null;
        address?: string;
        mobileNumber?: string;
    }
};

export interface AuthState {
    user: AuthUser;
    token: string | null;
    isAuthenticated: boolean;
}

export interface AuthPayload {
    "LOGIN": {
        isAuthenticated: boolean;
        user: AuthUser;
        token: string;
    },
    "LOGOUT": {
        isAuthenticated: boolean;
    }
}

export interface AuthLogin {
    email: string;
    password: string;
}

export interface JWTContextType {
    isAuthenticated: boolean;
    login: any
}