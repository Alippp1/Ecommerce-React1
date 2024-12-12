import { useEffect, useState } from "react";
import CardProducts from "../components/Fragments/CardProducts";
import { getProducts } from "../services/product.service";
import { Link } from "react-router-dom";
import FooterPage from "../components/Layouts/Footer";

const IndexPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // Fetch products
    getProducts((data) => {
      setProducts(data);

      // Extract unique categories
      const uniqueCategories = [
        "all",
        ...new Set(data.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    });
    
  }, []);

  const filterProductsByCategory = () => {
    if (selectedCategory === "all") return products;
    return products.filter(
      (product) => product.category === selectedCategory
    );
  };

  return (
    <>
      <div className="bg-white">
        {/* Header Section */}
        <header className="absolute inset-x-0 top-0 z-50 bg-white shadow-sm">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Logo"
                />
              </a>
            </div>
            <div className="flex gap-x-6">
              <Link to ="/" className="text-sm font-semibold leading-6 text-gray-900">
                Productst
              </Link>
              <Link to="/login" className="text-sm/6 font-semibold text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="relative isolate px-6 pt-24 lg:px-8">
          {/* Hero Section */}
          <div className="mx-auto max-w-3xl text-center py-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Discover Our Products
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Browse products by category.
            </p>
          </div>

          {/* Filter Section */}
          <div className="mb-8 text-center">
            <label
              htmlFor="category-select"
              className="mr-4 text-lg font-semibold text-gray-700"
            >
              Filter by Category:
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded border border-gray-300 bg-white p-2 text-sm shadow-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Products Section */}
          <div className="mx-auto max-w-7xl">
            {filterProductsByCategory().length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filterProductsByCategory().map((product) => (
                  <CardProducts key={product.id}>
                    <CardProducts.Header image={product.image} id={product.id} />
                    <CardProducts.Body name={product.title}>
                      {product.description}
                    </CardProducts.Body>
                    <CardProducts.Footer price={product.price} id={product.id} />
                  </CardProducts>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                No products available for this category.
              </div>
            )}
          </div>
        </main>

        {/* Footer Section */}
        <FooterPage />
      </div>
    </>
  );
};

export default IndexPage;
