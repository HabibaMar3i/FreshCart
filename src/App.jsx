import React, { useContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Login from './Components/Login/Login';
import Registeration from './Components/Registeration/Registeration';
import Products from './Components/Products/Products';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Layout from './Components/Layout/Layout';
import NotFound from './Components/NotFound/NotFound';
import { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { Toaster } from 'react-hot-toast';
import Profile from "./Components/Profile/Profile";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Payment from "./Components/Payment/Payment";
import WishList from "./Components/WishList/WishList";


function App() {
    let { setUserToken } = useContext(UserContext);
    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            setUserToken(localStorage.getItem("userToken"));
        }
    }, [setUserToken]);
    let routers = createBrowserRouter([
        {
            path: '', element: <Layout />, children: [
                { index: true, element: <Login /> },
                { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
                { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
                { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
                { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
                { path: 'registeration', element: <Registeration /> },
                { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
                { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
                { path: 'payment', element: <ProtectedRoute><Payment /></ProtectedRoute> },
                { path: 'forgetpassword', element: <ProtectedRoute><ForgetPassword /></ProtectedRoute> },
                { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
                { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
                { path: '*', element: <NotFound /> }
            ]
        }
    ]);

    return (
        <>
            <RouterProvider router={routers}>

            </RouterProvider>
            <Toaster />
        </>
    );
}

export default App;
