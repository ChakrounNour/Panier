import { configureStore } from '@reduxjs/toolkit';
import { panierSlice } from './panieSlice';

export const store = configureStore({
  reducer: {
    panier: panierSlice, 
  },
});
