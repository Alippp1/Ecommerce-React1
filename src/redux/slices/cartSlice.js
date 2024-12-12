import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: JSON.parse(localStorage.getItem("cart")) || [], // Ambil data dari localStorage saat inisialisasi
  },
  reducers: {
    addToCart(state, action) {
      const itemInCart = state.data.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        // Jika item sudah ada, tambahkan qty
        itemInCart.qty++;
      } else {
        // Jika item belum ada, tambahkan item baru
        state.data.push({ ...action.payload, qty: 1 });
      }

      // Simpan data cart terbaru ke localStorage
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    updateCart(state, action) {
      const { id, qty } = action.payload; // Dapatkan ID dan qty yang diupdate
      const itemToUpdate = state.data.find((item) => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.qty = qty; // Perbarui qty produk di cart
      }

      // Simpan data cart terbaru ke localStorage
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
  },
});

// Ekspor action dan reducer
export const { addToCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
