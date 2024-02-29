import React, { createContext } from "react";
import axios from "axios";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
    const headers = {
        token: localStorage.getItem('userToken')
    };

    

    function addToCart(productId) {
        return axios.post(
            `https://ecommerce.routemisr.com/api/v1/cart`,
            { productId },
            { headers: headers }
        ).then((response) => response)
            .catch((error) => error);
    }

    function deleteCart() {
        return axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart`,
            { headers: headers }
        ).then((response) => response)
            .catch((error) => error);
    }


    function removeCartItem(productId) {
        return axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { headers: headers }
        ).then((response) => response)
            .catch((error) => error);
    }

    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headers })
            .then((response) => response)
            .catch((error) => error);
    }

    function updateProductQuantity(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count },
            { headers: headers })
            .then((response) => response)
            .catch((error) => error);
    }



    return (
        <CartContext.Provider value={{ addToCart, getLoggedUserCart, removeCartItem, updateProductQuantity, deleteCart}}>
            {children}
        </CartContext.Provider>
    );
}
