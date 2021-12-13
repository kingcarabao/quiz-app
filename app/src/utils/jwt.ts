import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
import axios from './axios';

export const isValidToken = (accessToken: string) => {
    if (!accessToken) return false;
    const decoded = jwtDecode<{ exp: number }>(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp < currentTime;
}

export const accountType = (accessToken: string) => {
    if (!accessToken) return false;
    const decoded = jwtDecode<{ accountType: string }>(accessToken);
    
    return decoded.accountType;
}