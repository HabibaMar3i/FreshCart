import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';


function Product({ product }) {
    const [isToggled, setIsToggled] = useState(false);
    const toggleHeart = (event) => {
        event.preventDefault();
        setIsToggled(!isToggled);
        addProductToWishList(product._id);
    };

    const { addToCart } = useContext(CartContext);
    const { addToWishList } = useContext(WishListContext);

    async function addProductToCart(productId) {
        try {
            let response = await addToCart(productId);
            if (response && response.data && response.data.status === 'success') {
                toast.success('Product is added successfully', {
                    duration: 1000,
                    position: 'top-center'
                });
            } else {
                toast.error('Failed Process', {
                    duration: 1000,
                    position: 'top-center'
                });
            }
            console.log(response);
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('An error occurred while adding the product to the cart', {
                duration: 1000,
                position: 'top-center'
            });
        }
    }
    async function addProductToWishList(productId) {
        try {
            let response = await addToWishList(productId); 
            if (response && response.data && response.data.status === 'success') {
                toast.success('Product is added successfully to Wish List', {
                    duration: 1000,
                    position: 'top-center'
                });
            } else {
                toast.error('Failed Process', {
                    duration: 1000,
                    position: 'top-center'
                });
            }
            console.log(response);
        } catch (error) {
            console.error('Error adding product to WishList:', error);
            toast.error('An error occurred while adding the product to the WishList', {
                duration: 1000,
                position: 'top-center'
            });
        }
    }
    return (
        <>
            <Helmet>
                <meta />
                <title>Products</title>
            </Helmet>
            <div className="product overflow-hidden px-2 py-3 cursor-pointer ">
                <Link to={"/productDetails/" + product.id} className='link'>
                    <img className='w-100' src={product.imageCover} alt="" />
                    <div className='justify-content-between d-flex'>
                        <h5 className='font-sm text-main'>{product.category.name}</h5>
                        <h6 onClick={toggleHeart}>
                            {isToggled ? <i className="fa fa-heart text-main" aria-hidden="true"></i> : <i className="fa fa-heart" aria-hidden="true"></i>}
                        </h6>
                    </div>
                    <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                    <p className='d-flex justify-content-between'>
                        <span >{product.price} EGP</span>
                        <span>
                            <i className='fas fa-star rating-color me-1'></i>
                            {product.ratingsAverage}
                        </span>
                    </p>
                </Link>
                <div>
                    <button onClick={() => addProductToCart(product._id)} className='btn bg-main text-white w-100 '>Add To Cart</button>
                </div>
            </div>
        </>
    );
}

export default Product;
