import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CartItemType = {
  id: string;
  imageUrl: string;
  price: number;
  activeSize: number;
  title: string;
  activeType: string;
  count: number;
};

interface CartState {
  items: CartItemType[];
  count: number;
  price: number;
}

type AddItemProp = {
  index: number;
  price: number;
};

const initialState: CartState = {
  items: [],
  count: 0,
  price: 0,
};
//id, category, imageUrl, price, rating, sizes, title, types

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, imageUrl, price, activeSize, title, activeType } = action.payload;
      const itemToUpdate = state.items.find((item) => {
        return item.id === id && item.activeSize === activeSize && item.activeType === activeType;
      });
      if (itemToUpdate) {
        itemToUpdate.count++;
        state.count++;
        state.price = state.price + action.payload.price;
      } else {
        state.items.push(action.payload);
        state.count++;
        state.price = state.price + action.payload.price;
      }
    },
    addItem(state, action: PayloadAction<AddItemProp>) {
      state.items[action.payload.index].count++;
      state.count++;
      state.price = state.price + action.payload.price;
    },

    removeItem(state, action: PayloadAction<AddItemProp>) {
      if (state.items[action.payload.index].count > 1) {
        state.items[action.payload.index].count--;
        state.count--;
        state.price = state.price - action.payload.price;
      } else {
        state.items.splice(action.payload.index, 1);
        state.count--;
        state.price = state.price - action.payload.price;
      }
    },

    clearCart(state) {
      state.items = []
      state.price = 0;
      state.count = 0;
    }
  },
});

export const { addToCart, addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
