import { useEffect, useState } from "react";
import Button from "../Elements/Button";
import { useLogin } from "../../hooks/useLogin";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkMode } from "../../context/DarkMode";
import { useTotalPrice } from "../../context/TotalPriceContext";

const Navbar = () => {
  const username = useLogin(); // Mengambil username dari custom hook
  const [totalCart, setTotalCart] = useState(0);
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

        {/* Username */}
        <div className="text-gray-800 text-sm font-semibold ml-20">
          Hello, {username || "Guest"}
        </div>

        {/* Cart */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-gray-100 p-2 rounded-md shadow-md">
            <Link to="/cart">
              <span className="text-sm font-medium text-gray-700">
                Cart: <span className="font-bold">{totalCart}</span> | Total:{" "}
                <span className="font-bold"> ${total.toLocaleString("en-US")}</span>
              </span>
            </Link>
          </div>

          {/* Logout Button */}
          <Button
            classname="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout
          </Button>

          {/* Dark Mode Toggle */}
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="hidden" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)}/>
            <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${ isDarkMode ? "bg-blue-600" : "bg-gray-300" }`} >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${  isDarkMode ? "translate-x-5" : "" }`}></div>
            </div>
            <span className="ml-2 text-sm">
              {isDarkMode ? "Dark" : "Light"}
            </span>
          </label>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
