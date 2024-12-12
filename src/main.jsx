import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import ErrorPage from './pages/404.jsx'
import ProductPage from './pages/products.jsx'
import IndexPage from './pages/index.jsx'
import ProfilePage from './pages/profile.jsx'
import DetailProductPage from './pages/detailProduct.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import CartPage from './pages/cart.jsx'
import DarkModeContextProvider from './context/DarkMode.jsx'
import { TotalPriceProvider } from './context/TotalPriceContext.jsx'
// import Navbar from './components/Layouts/Navbar.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <IndexPage />,
    errorElement: <ErrorPage />
  },
  {
    path:"/login",
    element: <LoginPage />,
  },
   {
    path:"/register",
    element: <RegisterPage />
  },
  {
    path:"/products",
    element: <ProductPage />
  },
  {
    path:"/profile",
    element: <ProfilePage />
  },
  {
    path:"/product/:id",
    element: <DetailProductPage />
  },
    {
    path:"/cart",
    element: <CartPage />
  }

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
       <TotalPriceProvider>
         <RouterProvider router={router}/>
       </TotalPriceProvider>
      </DarkModeContextProvider>
    </Provider>
  </StrictMode>,
)
