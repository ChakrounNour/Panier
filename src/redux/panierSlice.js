import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrix: 0,
  promoCode: "",
  discount: 0,
};

const seuilsReduc = [
  { seuil: 200, reduction: 0.1 },
  { seuil: 100, reduction: 0.05 },
  { seuil: 0, reduction: 0 },
];

const promoCodes = {
  PROMO10: 0.1,
  PROMO5: 0.05,
};

const panierSlice = createSlice({
  name: "panier",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.key === newItem.key);
      if (!existingItem) {
        state.items.push({
          key: newItem.key,
          nom: newItem.nom,
          quantity: newItem.quantity,
          prix: newItem.prix,
          totalPrix: newItem.prix * newItem.quantity,
        });
        state.totalQuantity += newItem.quantity;
        state.totalPrix += newItem.prix * newItem.quantity;
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrix += newItem.prix * newItem.quantity;
        state.totalQuantity += newItem.quantity;
        state.totalPrix += newItem.prix * newItem.quantity;
      }
    },
    removeItem(state, action) {
      const key = action.payload;
      const existingItem = state.items.find((item) => item.key === key);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrix -= existingItem.totalPrix;
        state.items = state.items.filter((item) => item.key !== key);
      }
    },
    clearPanier(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrix = 0;
      state.promoCode = "";
      state.discount = 0;
    },
    updateQuantity(state, action) {
      const { key, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.key === key);
      if (existingItem) {
        state.totalQuantity =
          state.totalQuantity - existingItem.quantity + quantity;
        state.totalPrix =
          state.totalPrix -
          existingItem.totalPrix +
          existingItem.prix * quantity;
        existingItem.quantity = quantity;
        existingItem.totalPrix = existingItem.prix * quantity;
      }
    },
    applyPromoCode(state, action) {
      const { code } = action.payload;
      const discount = promoCodes[code] || 0;
      state.promoCode = code;
      state.discount = discount;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearPanier,
  updateQuantity,
  applyPromoCode,
} = panierSlice.actions;
export default panierSlice.reducer;

export const selectDiscountedTotal = (state) => {
  const total = state.panier.totalPrix;
  const discount = seuilsReduc
    .filter(({ seuil }) => total >= seuil)
    .reduce((max, { reduction }) => Math.max(max, reduction), 0);
  const totalWithDiscount = total - total * discount;
  const totalWithPromoDiscount =
    totalWithDiscount - totalWithDiscount * state.panier.discount;

  return { total, totalWithDiscount, totalWithPromoDiscount };
};
