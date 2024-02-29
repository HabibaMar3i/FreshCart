import axios from "axios";
import React, { createContext } from "react";

export const WishListContext = createContext();
function WishListContextProvider({children}) {
    const headers = {
        token: localStorage.getItem('userToken')
    };

    function addToWishList(productId) {
        return axios.post(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
            { productId },
            { headers: headers }
        ).then((response) => response)
            .catch((error) => error);
    }
    function getLoggedUserWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: headers })
            .then((response) => response)
            .catch((error) => error);
    }
    
    function removeWishListItem(productId) {
        return axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            { headers: headers }
        ).then((response) => response)
            .catch((error) => error);
    }

    return(
    <WishListContext.Provider value={{ addToWishList,getLoggedUserWishList, removeWishListItem }}>
        {children}
    </WishListContext.Provider>
    );
}

export default WishListContextProvider;