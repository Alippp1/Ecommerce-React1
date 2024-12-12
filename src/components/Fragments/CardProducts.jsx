/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "../Elements/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const CardProducts = (props) => {
  const { children } = props;
  return (
    <div className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 mx-2 my-2 flex flex-col justify-between overflow-hidden">
      {children}
    </div>
  );
};

const Header = (props) => {
  const { image, id } = props;
  return (
    <Link to={`/product/${id}`} className="relative">
      <img
        src={image}
        alt="product"
        className="w-full max-h-64 object-contain rounded-t-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
        style={{ objectPosition: "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
    </Link>
  );
};

const Body = (props) => {
  const { children, name } = props;
  return (
    <div className="px-4 py-3 flex-1">
      <a href="">
        <h5 className="text-xl font-semibold text-gray-800 hover:text-gray-600 tracking-tight">
          {name.substring(0, 20)} ...
        </h5>
        <p className="text-sm text-gray-500 mt-2 line-clamp-3">
          {children}
        </p>
      </a>
    </div>
  );
};

const Footer = (props) => {
  const { price, id } = props;
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between px-4 pb-4 border-t border-gray-200">
      <span className="text-lg font-bold text-gray-800">
        ${price.toLocaleString("id-ID", { style: "currency", currency: "USD" })}
      </span>
      <Button
        classname="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-blue-700"
        onClick={() => dispatch(addToCart({ id, qty: 1 }))}
      >
        Add to cart
      </Button>
    </div>
  );
};

CardProducts.Header = Header;
CardProducts.Body = Body;
CardProducts.Footer = Footer;

export default CardProducts;
