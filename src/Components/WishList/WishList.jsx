import React, { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";

function WishList() {
    const { getLoggedUserWishList, removeWishListItem } = useContext(WishListContext);
    const [wishList, setWishList] = useState(null);

    async function getWishlist() {
        try {
            const response = await getLoggedUserWishList();
            if (response.data && response.data.status === "success") {
                setWishList(response.data);
            } else {
                console.error("Failed to fetch wishlist:", response.data);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    }

    async function deleteItem(productId) {
        try {
            const response = await removeWishListItem(productId);
            if (response.data && response.data.status === "success") {
                getWishlist();
            } else {
                console.error("Failed to remove item from wishlist:", response.data);
            }
        } catch (error) {
            console.error("Error removing item from wishlist:", error);
        }
    }

    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <>
            {wishList ? (
                <div className="w-75 mx-auto p-3 bg-main-light mt-4">
                    <h3>Wishlist:</h3>
                    <h6 className="text-main fw-bolder mb-4">Items: {wishList.count}</h6>
                    {wishList.data.map((product) => (
                        <div key={product.id} className="row border-bottom py-2 px-2">
                            <div className="col-md-1">
                                <img className="w-100" src={product.imageCover} alt={product.title} />
                            </div>
                            <div className="col-md-11">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h3 className="h6">{product.title.split(" ").slice(0, 3).join(" ")}</h3>
                                        <h6 className="text-main">Price: {product.price} EGP</h6>
                                    </div>
                                    <button className="btn p-0" onClick={() => deleteItem(product.id)}>
                                        <i className="text-danger fa fa-trash text-red fs-7"></i> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="container bg-light p-5 mt-4 d-flex align-items-center justify-content-center">
                    <h1 className="text-center fw-bolder">Your Wishlist is empty</h1>
                </div>
            )}
        </>
    );
}

export default WishList;

