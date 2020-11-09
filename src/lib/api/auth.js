import client from './client';

//로그인
export const login = ({username, password})=>
    client.post('/api/auth/login',{username,password});

export const register = ({username, password})=>
    client.post('api/auth/register', {username, password});

export const check =() =>client.get('/api/auth/check');

//로그아웃
export const logout = () => client.post('/api/auth/logout');