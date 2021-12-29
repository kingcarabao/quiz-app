import jwtDecode from 'jwt-decode';
import { localHttp } from './axios';

export const isValidToken = (accessToken: string) => {
  if (!accessToken) return false;
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
}

export const accountType = (accessToken: string) => {
  if (!accessToken) return false;
  const decoded = jwtDecode<{ accountType: string }>(accessToken);
  
  return decoded.accountType;
}

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localHttp.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete localHttp.defaults.headers.common.Authorization;
  }
};