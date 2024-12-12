import { Fragment, useContext, useEffect, useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import TableCart from "../components/Fragments/TableCart";


import Navbar from '../components/Layouts/Navbar';
import { DarkMode } from "../context/DarkMode";
import FooterPage from "../components/Layouts/Footer";
import { getProducts } from "../services/product.service";
import { Link } from 'react-router-dom';

export const CartPage = () => {
    const [products, setProducts] = useState([]);
    const { isDarkMode } = useContext(DarkMode);
    useLogin();

    useEffect(()=>{
        getProducts((data)=>{
            setProducts(data);
        })
    })

    return (
        <Fragment>
            <div className={`min-h-screen flex flex-col transition-all 
                ${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"}`}>
                <Navbar />
                <div className="flex-grow flex justify-center w-full mt-20">
                    <div className="w-full max-w-4xl mx-5 mt-8">
                        <h1
                            className={`text-3xl font-bold mb-4 text-center ${
                            isDarkMode ? "text-green-400" : "text-green-600"
                            }`}
                            id="cart"
                        >
                            Cart
                        </h1>
                        <TableCart products={products} />
                        <Link to="/products" className="inline-flex items-center space-x-2 transition-all duration-300 hover:space-x-4 hover:text-yellow-600">
                            <span className="font-semibold text-lg text-yellow-500 hover:text-yellow-600 transition-colors duration-300">
                                Back
                            </span>
                        </Link>

                    </div>
                </div>
                <FooterPage />
            </div>
        </Fragment>

    );
};

export default CartPage;
