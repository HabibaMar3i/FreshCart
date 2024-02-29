import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserContextProvider } from "./Context/UserContext";
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CartContextProvider } from './Context/CartContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WishListContextProvider from './Context/WishListContext';

const queryClient = new QueryClient();
ReactDOM.render(
    <WishListContextProvider>
        <CartContextProvider>
            <QueryClientProvider client={queryClient}>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
                <ReactQueryDevtools initialIsOpen={false} position={'bottom-right'} />
            </QueryClientProvider>
        </CartContextProvider>
    </WishListContextProvider>,
    document.getElementById('root')
);