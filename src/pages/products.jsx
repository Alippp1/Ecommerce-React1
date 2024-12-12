import { Fragment, useEffect, useState, useContext } from "react";
import CardProducts from "../components/Fragments/CardProducts";
import { getProducts } from "../services/product.service";
import { useLogin } from "../hooks/useLogin";
import TableCart from "../components/Fragments/tableCart";
import Navbar from "../components/Layouts/Navbar";
import FooterPage from "../components/Layouts/Footer";
import { DarkMode } from "../context/DarkMode";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { isDarkMode } = useContext(DarkMode);
  useLogin();

  // Ambil data produk dari API
  useEffect(() => {
    getProducts((data) => {
      setProducts(data);

      // Extract unique categories, including "all" as default
      const uniqueCategories = [
        "all",
        ...new Set(data.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    });
  }, []);

  // Filter produk berdasarkan kategori
  const filterProductsByCategory = () => {
    if (selectedCategory === "all") return products;
    return products.filter(
      (product) => product.category === selectedCategory
    );
  };

  return (
    <Fragment>
      {/* Wrapper dengan gaya berdasarkan mode gelap */}
      <div className={`min-h-screen transition-all 
        ${ isDarkMode ? "bg-slate-900 text-black" : "bg-white text-white-900"}`}>
        
        {/* Header Section */}
        <Navbar />

        {/* Filter Section */}
        <div className="my-8 text-center pt-[64px]">
          <label htmlFor="category-select" className={`mr-4 text-lg font-semibold ${
              isDarkMode ? "text-gray-300" : "text-gray-700" }`}>
            Filter by Category:
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`rounded border p-2 text-sm shadow-sm ${
              isDarkMode
                ? "border-gray-600 bg-slate-800 text-white"
                : "border-gray-300 bg-white text-gray-900"
            }`}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap justify-between mx-auto max-w-7xl px-4 mb-16">
          <div className="flex-grow mb-8 w-full lg:w-3/4">
            {/* Grid Products */}
            {filterProductsByCategory().length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filterProductsByCategory().map((product) => (
                  <CardProducts key={product.id}>
                    <CardProducts.Header
                      image={product.image}
                      id={product.id}
                    />
                    <CardProducts.Body name={product.title}>
                      {product.description}
                    </CardProducts.Body>
                    <CardProducts.Footer
                      price={product.price}
                      id={product.id}
                    />
                  </CardProducts>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                No products available for this category.
              </div>
            )}
          </div>

          {/* Cart Section */}
          <div className="flex items-center justify-center w-full mt-8 hidden">
            <div className="w-full max-w-4xl mx-5 mt-8">
              <h1 className={`text-3xl font-bold mb-4 text-center ${
                  isDarkMode ? "text-green-400" : "text-green-600"
                }`}
                id="cart"
              >
                Cart
              </h1>
              <TableCart products={products} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <FooterPage />
      </div>
    </Fragment>
  );
};

export default ProductPage;
