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
        if (itemInCart.stock > itemInCart.qty) {
          // Tambahkan qty hanya jika stock masih tersedia
          itemInCart.qty++;
        } else {
          alert("Stock is not sufficient");
          return;
        }
      } else {
        // Jika item belum ada, tambahkan item baru dengan stock default 20
        state.data.push({ ...action.payload, qty: 1, stock: 20 });
      }

      // Simpan data cart terbaru ke localStorage
      alert("Product added to cart");
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    updateCart(state, action) {
      const { id, qty } = action.payload; // Dapatkan ID dan qty yang diupdate
      const itemToUpdate = state.data.find((item) => item.id === id);

      if (itemToUpdate) {
        if (qty <= itemToUpdate.stock) {
          // Perbarui qty produk di cart jika tidak melebihi stock
          itemToUpdate.qty = qty;
        } else {
          alert("Quantity exceeds available stock");
          return;
        }
      }

      // Simpan data cart terbaru ke localStorage
      alert("Product has been updated");
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    removeFromCart(state, action) {
      // Filter data untuk menghapus item berdasarkan ID
      state.data = state.data.filter((item) => item.id !== action.payload.id);

      // Simpan data cart terbaru ke localStorage
      alert("Product has been deleted");
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
    checkout(state) {
      // Tampilkan alert "berhasil dibayar"
      alert("Checkout successful");

      // Hapus data cart dari state dan localStorage
      state.data = [];
      localStorage.removeItem("cart");
    },
    updateStock(state, action) {
      const { id, newStock } = action.payload; // Dapatkan ID dan stock baru
      const itemToUpdate = state.data.find((item) => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.stock = newStock; // Perbarui stock produk
      }

      // Simpan data cart terbaru ke localStorage
      alert("Stock has been updated");
      localStorage.setItem("cart", JSON.stringify(state.data));
    },
  },
});

// Ekspor action dan reducer
export const { addToCart, updateCart, removeFromCart, checkout, updateStock } = cartSlice.actions;
export default cartSlice.reducer;
