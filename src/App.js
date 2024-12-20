import './App.css';
import jwtDecode from 'jwt-decode';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { Toaster, toast } from 'react-hot-toast';
import { CartContextProvider } from './Context/CartContext.js';
import { ProductsContextProvider } from './Context/ProductsContext.js';
import { AuthenticationContextProvider } from './Context/AuthenticationContext.js';
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Categories from './Components/Categories/Categories';
import NotFound from './Components/NotFound/NotFound';
import Brands from './Components/Brands/Brands';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import Checkout from './Components/Checkout/Checkout';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import WishList from './Components/WishList/WishList';
import AllOrders from './Components/AllOrders/AllOrders';



function App() {

  const [userData, setUserData] = useState(null);
  const [wasOffline, setWasOffline] = useState(false);

  // Handle online status
  useEffect(() => {
    const handleOnline = () => {
      if (wasOffline) {
        toast.success('You are back online!', {
          icon: '🌐',
          duration: 3000,
          position: 'top-center'
        });
      }
      setWasOffline(false);
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [wasOffline]);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-position', `${window.scrollY}px`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function saveUserDate() {
    let encodedToken = localStorage.getItem('userToken');
    if (encodedToken) {
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
    }
  }

  let router = createBrowserRouter([
    {
      path: '', element: <Layout userData={userData} setUserData={setUserData} saveUserDate={saveUserDate} />, children: [
        { path: 'login', element: <Login saveUserDate={saveUserDate} /> },
        { path: 'register', element: <Register /> },
        { path: 'forgot-password', element: <ForgetPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: 'categories/:id', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands/:id', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><AllOrders userData={userData} /></ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ]
    },
  ]);

  return <>
    <div>
      <Offline>
        <div className='offline'>
          You are offline
          <i className="fa-solid fa-face-frown fa-xl ms-2"></i>
        </div>
        {!wasOffline && setWasOffline(true)}
      </Offline>
    </div>

    <AuthenticationContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartContextProvider>
      </ProductsContextProvider>
    </AuthenticationContextProvider>
  </>
}

export default App;
