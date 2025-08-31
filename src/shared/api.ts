import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseUrl = 'http://localhost:3000';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Users'],
  endpoints: () => ({}),
});
