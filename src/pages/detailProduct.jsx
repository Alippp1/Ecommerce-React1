import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailProduct } from "../services/product.service";

const DetailProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []); // Track cart in state
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    getDetailProduct(id, (data) => {
      setProduct(data);
    });
  }, [id]);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  // Check if the product category is either 'jewelery' or 'electronics'
  const isCategoryExcluded =
    product.category === "jewelery" || product.category === "electronics";

  const handleAddToCart = () => {
    // Check if there is a token in localStorage (indicating the user is logged in)
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirect to login page if token is not present (not logged in)
      alert("Please login first!");
      navigate("/login");
      return;
    }

    // Add product to the cart or update quantity if already in the cart
    const updatedCart = [...cart]; // Copy cart state to prevent direct mutation
    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Increment quantity if the product is already in the cart
      existingProduct.qty += 1;
    } else {
      // Add new product to the cart
      updatedCart.push({ id: product.id, qty: 1 });
    }

    // Save updated cart to localStorage and update state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart); // Update cart state immediately

    alert("Product successfully added to the cart!");
    navigate("/products");
    window.location.reload();
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
      {Object.keys(product).length > 0 && (
        <div className="flex font-serif max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Gambar Produk */}
          <div
            className={`flex-none w-72 relative transition-transform duration-300 ${
              isZoomed ? "scale-110" : ""
            }`}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain cursor-pointer"
              onClick={handleImageClick}
              loading="lazy"
            />
          </div>

          {/* Informasi Produk */}
          <form className="flex-auto p-8">
            {/* Judul & Harga */}
            <div className="flex flex-wrap items-baseline">
              <h1 className="w-full text-3xl font-bold mb-2 text-slate-900">
                {product.title}
              </h1>
              <div className="flex-auto text-lg font-semibold text-green-600">
                ${product.price}
              </div>
              <div className="text-sm font-medium text-gray-500">
                Review: {product.rating.rate} / 5 ({product.rating.count})
              </div>
            </div>

            <div className="flex items-center mt-6 mb-4 pb-6 border-b border-gray-300">
              <div className="space-x-2 flex text-sm font-medium">
                {product.description}
              </div>
            </div>

            {/* Pilihan Ukuran - Kondisi untuk kategori Jewelery dan Electronics */}
            {!isCategoryExcluded && (
              <div className="flex items-center mt-6 mb-4 pb-6 border-b border-gray-300">
                <div className="space-x-2 flex text-sm font-medium">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <label key={size} className="cursor-pointer">
                      <input
                        className="sr-only peer"
                        name="size"
                        type="radio"
                        value={size}
                      />
                      <div className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 border border-gray-300 peer-checked:bg-gray-800 peer-checked:text-white">
                        {size}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Tombol Aksi */}
            <div className="flex space-x-4 mb-5 text-sm font-medium">
              <div className="flex-auto flex space-x-4 pr-4">
                <button
                  className="flex-1 h-12 border border-gray-300 text-gray-700 rounded-lg shadow hover:bg-green-100 transition"
                  type="button"
                  onClick={handleAddToCart} // Handle add to cart
                >
                  Add to Cart
                </button>
              </div>
              <button
                className="flex-none w-12 h-12 flex items-center justify-center text-gray-400 border border-gray-300 rounded-full shadow hover:text-red-500 hover:border-red-500 transition"
                type="button"
                aria-label="Like"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  />
                </svg>
              </button>
            </div>

            {/* Info Pengiriman */}
            <p className="text-sm text-gray-500">
              Free shipping on all continental US orders.
            </p>
          </form>
        </div>
      )}

      {/* Overlay untuk Zoom */}
      {isZoomed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={handleImageClick}
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-w-4xl max-h-[90vh] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default DetailProductPage;
