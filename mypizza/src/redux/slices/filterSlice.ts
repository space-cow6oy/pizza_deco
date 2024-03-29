import { createSlice } from '@reduxjs/toolkit';

type FilterState = {
  activeCategory: number;
  activeSortType: 'популярности' | 'цене' | 'алфавиту';
};

const initialState: FilterState = {
  activeCategory: 0,
  activeSortType: 'популярности',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setActiveSortType(state, action) {
      state.activeSortType = action.payload;
    },
  },
});

export const { setActiveCategory, setActiveSortType } = filterSlice.actions;

export default filterSlice.reducer;
