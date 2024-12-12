import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../../context/DarkMode";

const AuthLayout = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, title, type } = props;
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  return (
    <div className={`flex justify-center min-h-screen items-center 
        ${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"}`}>
         
         {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4 flex items-center">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="hidden" checked={isDarkMode} 
                onChange={() => setIsDarkMode(!isDarkMode)} />
            <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 transition ${
                isDarkMode ? "bg-blue-600" : "bg-gray-300" }`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  isDarkMode ? "translate-x-5" : ""}`}>
              </div>
            </div>
            <span className="ml-2 text-sm">
              {isDarkMode ? "Dark" : "Light"}
            </span>
          </label>
        </div>
      <div className="w-full max-w-xs relative">
       <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
        <p className="font-medium text-slate-500 mb-8">Welcome</p>
        {children}
        <Navigation type={type} />
      </div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Navigation = ({ type }) => {
  if (type === "login") {
    return (
      <p className="text-sm mt-5 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="font-bold text-blue-600">
          Register
        </Link>
      </p>
    );
  } else {
    return (
      <p className="text-sm mt-5 text-center">
        Have an account?{" "}
        <Link to="/login" className="font-bold text-blue-600">
          Login
        </Link>
      </p>
    );
  }
};

export default AuthLayout;
