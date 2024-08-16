import { createSlice } from "@reduxjs/toolkit";

export const panierSlice = createSlice({
  name: 'panier',
  initialState: [],
  reducers: {
    addPanier: (state, action) => {
      const { item, quantity } = action.payload;
      // Ajoute chaque produit séparément, même s'ils sont identiques.
      state.push({ ...item, quantity });
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.find((i) => i.id === itemId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addPanier, removeFromCart, updateQuantity } = panierSlice.actions;
export default panierSlice.reducer;