import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../../Assets/freshcart-logo.svg";
import { UserContext } from '../../Context/UserContext';
import { CartContext } from "../../Context/CartContext";

function Navbar() {
    const { getLoggedUserCart } = useContext(CartContext);
    const [cartDetails, setCartDetails] = useState({ numOfCartItems: 0 });

        async function fetchCart() {
            try {
                const response = await getLoggedUserCart();
                if (response.data && response.data.status === "success") {
                    const numOfCartItems = response.data.numOfCartItems;
                    setCartDetails({ numOfCartItems });
                } else {
                    console.error("Failed to fetch cart:", response.data);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }
        useEffect(() => {
            fetchCart();
        }, []);
    

    const { userToken, setUserToken } = useContext(UserContext);

    function LogOut() {
        localStorage.removeItem('userToken');
        setUserToken(null);
    }

    return (
        <nav className="navbar navbar-expand-lg text-primary bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand ms-4" to="/"><img src={logo} alt="FreshCart Logo" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {userToken ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/products">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/categories">Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/brands">Brands</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/wishlist">WishList</Link>
                                </li>
                            </>
                        ) : null}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mt-1">
                            <i className="fab fa-instagram p-2 text-black"></i>
                            <i className="fab fa-facebook p-2 text-black"></i>
                            <i className="fab fa-twitter p-2 text-black"></i>
                            <i className="fab fa-linkedin p-2 text-black"></i>
                            <i className="fab fa-tiktok p-2 text-black"></i>
                            <i className="fab fa-youtube p-2 text-black"></i>
                        </li>
                        {userToken ? (
                            <>
                                <li className="nav-item mt-1">
                                    <Link to="/cart">
                                        <i className="fa-solid fa-cart-shopping p-2"></i>
                                        <span className='badge badge-warning' id='lblCartCount'>{cartDetails.numOfCartItems}</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link cursor-pointer" onClick={() => LogOut()}>Logout</span>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/registeration">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
