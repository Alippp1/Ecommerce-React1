import { useEffect, useState, useContext } from "react";
import Button from "../Elements/Button";
import { useLogin } from "../../hooks/useLogin";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";
import { useTotalPrice } from "../../context/TotalPriceContext";

const Navbar = () => {
  const username = useLogin(); // Mengambil username dari custom hook
  const [totalCart, setTotalCart] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk hamburger menu
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  const { total } = useTotalPrice();

  // Mendapatkan data cart dari Redux store
  const cart = useSelector((state) => state.cart.data);

  useEffect(() => {
    // Menghitung total item dalam keranjang setiap kali `cart` berubah
    const sum = cart.reduce((acc, item) => acc + item.qty, 0);
    setTotalCart(sum);
  }, [cart]);

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
      <nav className="flex items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt="Logo"
            />
          </a>
        </div>

        {/* Hamburger Menu Button */}
        <button
          type="button"
          className="sm:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Menu untuk Desktop */}
        <div className="hidden sm:flex items-center space-x-8">
          <div className="text-gray-800 text-sm font-semibold">Hello, {username || "Guest"}</div>
          <Link to="/cart" className="text-sm font-medium text-gray-700">
            Cart: <span className="font-bold">{totalCart}</span> | Total:{" "}
            <span className="font-bold">${total.toLocaleString("en-US")}</span>
          </Link>
          <Button
            classname="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </Button>
          {/* Dark Mode Toggle */}
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <div
              className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${
                isDarkMode ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  isDarkMode ? "translate-x-5" : ""
                }`}
              ></div>
            </div>
            <span className="ml-2 text-sm">{isDarkMode ? "Dark" : "Light"}</span>
          </label>
        </div>
      </nav>

      {/* Menu untuk Mobile */}
      <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden bg-gray-100 shadow-md`}>
        <div className="px-6 py-4 space-y-2">
          <Link to="/products" className="block text-gray-700 font-medium">
            Home
          </Link>
          <Link to="/cart" className="block text-gray-700 font-medium">
            Cart
          </Link>
          <button
            onClick={handleLogout}
            className="block text-left w-full text-red-600 font-medium"
          >
            Logout
          </button>
          {/* Dark Mode Toggle */}
          <label className="flex items-center cursor-pointer mt-2">
            <input
              type="checkbox"
              className="hidden"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <div
              className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${
                isDarkMode ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  isDarkMode ? "translate-x-5" : ""
                }`}
              ></div>
            </div>
            <span className="ml-2 text-sm">{isDarkMode ? "Dark" : "Light"}</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
