// features/users/store/usersSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UsersUIState {
  searchQuery: string;
  currentPage: number;
  pageSize: number;
}

const initialState: UsersUIState = {
  searchQuery: '',
  currentPage: 1,
  pageSize: 10,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page on new search
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
  },
});

export const { setSearchQuery, setCurrentPage, setPageSize } = usersSlice.actions;
export default usersSlice.reducer;