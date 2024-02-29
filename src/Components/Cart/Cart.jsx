import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { useState } from "react";
import { Link } from "react-router-dom";

function Cart() {

    const { getLoggedUserCart, removeCartItem, updateProductQuantity, deleteCart } = useContext(CartContext);
    const [cartDetails, setCartDetails] = useState(null);



    async function getCart() {
        let { data } = await getLoggedUserCart();
        setCartDetails(data);
    }

    async function clearCart() {
        await deleteCart();
        setCartDetails(null);
    }

    async function deleteItem(productId) {
        let { data } = await removeCartItem(productId);
        setCartDetails(data);
    }

    async function updateCount(productId, count) {
        if (count > 0) {
            let { data } = await updateProductQuantity(productId, count);
            setCartDetails(data);
        } else {
            await deleteItem(productId);
        }
    }




    useEffect(() => {
        getCart();
    }, []);


    return (
        <>
            {cartDetails ? (
                <div className="w-75 mx-auto p-3 bg-main-light">
                    <h3>Shopping Cart:</h3>
                    <h6 className="text-main fw-bolder mb-4">Cart Items: {cartDetails.numOfCartItems}</h6>
                    <h6 className="text-main fw-bolder mb-4">Total Cart Price: {cartDetails.data.totalCartPrice} EGP</h6>
                    {cartDetails.data.products.map((product) => (
                        <div key={product.product.id} className="row border-bottom py-2 px-2">
                            <div className="col-md-1">
                                <img className='w-100' alt="" src={product.product.imageCover} />
                            </div>
                            <div className="col-md-11">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h3 className="h6">{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                                        <h6 className="text-main">Price: {product.price} EGP</h6>
                                    </div>
                                    <div>
                                        <button className="brdr-main p-1" onClick={() => updateCount(product.product.id, product.count + 1)}>+</button>
                                        <span className="mx-2">{product.count}</span>
                                        <button className="brdr-main p-1" onClick={() => updateCount(product.product.id, product.count - 1)}>-</button>
                                    </div>
                                </div>
                                <button className="btn p-0" onClick={() => deleteItem(product.product.id)}><i className="text-danger fa fa-trash text-red fs-7"></i>  Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="d-flex justify-content-between">
                        <button className="btn bg-main text-white mt-2" onClick={clearCart}>Clear Cart</button>                    
                        <Link to="/payment" className="btn bg-main text-white mt-2">Check out</Link>
                    </div>
                </div>
            ) : (
                <div className="container bg-light p-5 mt-4 d-flex align-items-center justify-content-center">
                    <h1 className="text-center fw-bolder">Your Cart is empty</h1>
                </div>
            )}
        </>
    );
}

export default Cart;
