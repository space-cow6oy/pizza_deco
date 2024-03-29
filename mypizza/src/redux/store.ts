import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
