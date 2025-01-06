import { createAsyncThunk } from '@reduxjs/toolkit';
import { URL } from '@shared';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${URL}api/user/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const json = await response.json();
        return json;
      } else {
        return rejectWithValue('DataError');
      }
    } catch {
      return rejectWithValue('NetworkError');
    }
  }
);
