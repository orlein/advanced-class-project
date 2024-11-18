import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://ozadv6.beavercoding.net/api',
  prepareHeaders: headers => {
    const token = sessionStorage.getItem('accessToken');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    headers.set('accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});
