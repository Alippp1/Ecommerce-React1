/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { DarkMode } from "../../context/DarkMode";
import {
  useTotalPrice,
  useTotalPriceDispatch,
} from "../../context/TotalPriceContext";
import {
  updateCart,
  removeFromCart,
  updateStock,
} from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const TableCart = (props) => {
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch();
  const totalPriceDispatch = useTotalPriceDispatch();
  const { total } = useTotalPrice();
  const { isDarkMode } = useContext(DarkMode);

  const [editedCart, setEditedCart] = useState([]);

  // Sync editedCart dengan Redux cart
  useEffect(() => {
    setEditedCart(
      cart.map((item) => ({ id: item.id, qty: item.qty, isUpdated: false }))
    );
  }, [cart]);

  // Handle perubahan kuantitas
  const handleQtyChange = (id, value) => {
    const qty = Math.max(0, parseInt(value || "0", 10)); // Minimal kuantitas adalah 0
    setEditedCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty, isUpdated: true } : item
      )
    );
  };

  // Update total harga
  useEffect(() => {
    if (editedCart.length > 0) {
      const updatedTotal = editedCart.reduce((acc, item) => {
        const product = products.find((p) => p.id === item.id);
        return product ? acc + product.price * item.qty : acc;
      }, 0);

      totalPriceDispatch({
        type: "UPDATE",
        payload: { total: updatedTotal },
      });
    }
  }, [editedCart, products, totalPriceDispatch]);

  // Handle proses kuantitas
  const handleProcess = (id) => {
  const updatedItem = editedCart.find((item) => item.id === id);
  const product = products.find((p) => p.id === id);

  if (updatedItem && product) {
    // Cek apakah jumlah yang diperbarui melebihi stok yang tersedia
    if (updatedItem.qty > product.stock + cart.find((c) => c.id === id).qty) {
      alert("Quantity exceeds available stock");
      return;
    }

    // Hitung stok baru
    const currentCartItem = cart.find((c) => c.id === id);
    const newStock = product.stock + currentCartItem.qty - updatedItem.qty;

    // Lakukan pembaruan stok dan cart
    dispatch(updateCart({ id, qty: updatedItem.qty }));
    dispatch(updateStock({ id, newStock }));

    // Update localStorage
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: updatedItem.qty } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Tandai item sebagai tidak perlu diperbarui lagi
    setEditedCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isUpdated: false } : item
      )
    );
  }
};


  // Handle penghapusan item dari cart
  const handleDelete = (id) => {
    dispatch(removeFromCart({ id }));
  };

  // Untuk mengatur visibilitas baris total harga
  const totalPriceRef = useRef(null);
  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  // Handle checkout
  const navigate = useNavigate();
  const handleCheckout = () => {
    alert("Payment success");

    dispatch({ type: "cart/clearCart" }); // Pastikan Anda sudah memiliki aksi clearCart
    localStorage.removeItem("cart");

    navigate("/products");
    window.location.reload();
  };

  return (
    <table
      className={`w-full table-auto border-separate border-spacing-2 transition-all ${
        isDarkMode
          ? "text-white bg-slate-800"
          : "text-gray-700 bg-white"
      }`}
    >
      <thead>
        <tr
          className={`${
            isDarkMode ? "bg-slate-700 text-gray-300" : "bg-green-100 text-gray-800"
          }`}
        >
          <th className="p-3 text-left text-sm font-medium w-1/4">Product</th>
          <th className="p-3 text-center text-sm font-medium w-1/4">Price</th>
          <th className="p-3 text-center text-sm font-medium w-1/4">Quantity</th>
          <th className="p-3 text-center text-sm font-medium w-1/4">Total</th>
          <th className="p-3 text-center text-sm font-medium w-1/4">Action</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => {
          const product = products.find((product) => product.id === item.id);
          if (!product || !product.price) return null;

          const productTitle = product.title || "No title";
          const editedItem = editedCart.find((edited) => edited.id === item.id);

          return (
            <tr
              key={item.id}
              className={`border-t ${
                isDarkMode
                  ? "border-gray-600 hover:bg-slate-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <td className="p-3 text-left text-sm">
                {productTitle.length > 20
                  ? productTitle.substring(0, 20) + "..."
                  : productTitle}
              </td>
              <td className="p-3 text-center text-sm">
                ${product.price.toLocaleString("en-US")}
              </td>
              <td className="p-3 text-center text-sm">
                <input
                  type="number"
                  className={`w-16 text-center border border-gray-300 rounded ${
                    isDarkMode
                      ? "text-white bg-slate-800"
                      : "text-gray-900 bg-white"
                  }`}
                  value={editedItem ? editedItem.qty : item.qty}
                  onChange={(e) => handleQtyChange(item.id, e.target.value)}
                />
                {editedItem?.isUpdated && (
                  <button
                    className="ml-2 text-sm text-green-600 hover:text-green-800"
                    onClick={() => handleProcess(item.id)}
                  >
                    Proses
                  </button>
                )}
              </td>
              <td className="p-3 text-center text-sm">
                ${(
                  product.price *
                  (editedItem?.qty !== undefined ? editedItem.qty : item.qty)
                ).toLocaleString("en-US")}
              </td>
              <td className="p-3 text-center text-sm">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
        <tr
          ref={totalPriceRef}
          className={`font-semibold ${
            isDarkMode ? "bg-slate-700 text-gray-300" : "bg-green-200 text-gray-800"
          }`}
        >
          <td colSpan={4} className="p-3 text-center">
            Total Price
          </td>
          <td className="p-3 text-center">
            ${total ? total.toLocaleString("en-US") : "0.00"}
          </td>
        </tr>
        <tr>
          <td colSpan={5} className="p-3 text-center">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 bg-green-600 rounded-lg shadow-md hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              Checkout
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableCart;
