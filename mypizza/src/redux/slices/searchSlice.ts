import { createSlice } from '@reduxjs/toolkit';

interface Search {
  searchValue: string;
}

const initialState: Search = {
  searchValue: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;
export default searchSlice.reducer;
