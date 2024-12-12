import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { DarkMode } from "../../context/DarkMode";
import { useTotalPrice, useTotalPriceDispatch } from "../../context/TotalPriceContext";
import { updateCart } from "../../redux/slices/cartSlice"; // import updateCart action

const TableCart = (props) => {
  // eslint-disable-next-line react/prop-types
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const dispatch = useDispatch(); // Use Redux dispatch
  const totalPriceDispatch = useTotalPriceDispatch();
  const { total } = useTotalPrice();

  const { isDarkMode } = useContext(DarkMode);

  // State untuk menyimpan qty yang sedang diedit
  const [editedCart, setEditedCart] = useState([]);

  useEffect(() => {
    // Inisialisasi cart yang dapat diedit
    setEditedCart(
      cart.map((item) => ({ id: item.id, qty: item.qty, isUpdated: false }))
    );
  }, [cart]);

  // Fungsi untuk mengubah nilai qty
  const handleQtyChange = (id, value) => {
    setEditedCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: value ? parseInt(value, 10) : 0, isUpdated: true }
          : item
      )
    );
  };

  // Hitung total harga secara otomatis saat editedCart berubah
  useEffect(() => {
    const updatedTotal = editedCart.reduce((acc, item) => {
      // eslint-disable-next-line react/prop-types
      const product = products.find((p) => p.id === item.id);
      return product ? acc + (product.price || 0) * item.qty : acc;
    }, 0);

    totalPriceDispatch({
      type: "UPDATE",
      payload: {
        total: updatedTotal,
      },
    });
  }, [editedCart, products, totalPriceDispatch]);

  // Fungsi untuk memproses perubahan qty dan menyimpan ke Redux dan localStorage
  const handleProcess = (id) => {
    const updatedItem = editedCart.find((item) => item.id === id);
    if (updatedItem) {
      // Update the cart in Redux store
      dispatch(updateCart({ id, qty: updatedItem.qty }));

      // Update localStorage
      const updatedCart = cart.map((item) =>
        item.id === id ? { ...item, qty: updatedItem.qty } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    setEditedCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isUpdated: false } : item))
    );
  };

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  return (
    <table
      className={`w-full table-auto border-separate border-spacing-2 transition-all ${isDarkMode ? "text-white bg-slate-800" : "text-gray-700 bg-white"}`}
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
          // eslint-disable-next-line react/prop-types
          const product = products.find((product) => product.id === item.id);
          if (!product || !product.price) return null; // Jangan render jika data produk tidak valid

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
                ${product.price ? product.price.toLocaleString("en-US") : "0.00"}
              </td>
              <td className="p-3 text-center text-sm">
                <input
                  type="number"
                  className="w-16 text-center border border-gray-300 rounded"
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
              <td>
                <button>delete</button>
              </td>
            </tr>
          );
        })}
        <tr
          ref={totalPriceRef}
          className={`font-semibold ${isDarkMode ? "bg-slate-700 text-gray-300" : "bg-green-200 text-gray-800"}`}
        >
          <td colSpan={4} className="p-3 text-center">
            Total Price
          </td>
          <td className="p-3 text-center">
            ${total ? total.toLocaleString("en-US") : "0.00"}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableCart;
