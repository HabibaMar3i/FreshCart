// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Slider from "react-slick";
// function ProductDetails() {
//     var settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: false
//     };



//     const { id } = useParams();
//     const [productDetails, setProductDetails] = useState({});
//     const [isLoading, setIsLoading] = useState(false);

//     async function getProductDetails() {
//         setIsLoading(true);
//         try {
//             const { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/products/' + id);
//             setProductDetails(data.data);
//         } catch (error) {
//             console.error('Error fetching product details:', error);
//         }
//         setIsLoading(false);
//     }

//     useEffect(() => {
//         getProductDetails();
//     }, [id]);

//     return (
//         <>
//             {isLoading ? (
//                 <div className='d-flex align-items-center justify-content-center my-5 py-5'>
//                     <i className='fas fa-spin fa-spinner fa-2x'></i>
//                 </div>
//             ) : (
//                 <div className='row align-items-center py-5'>
//                     <div className="col-md-3">
//                         {productDetails.images?.length > 0 && (
//                             <Slider {...settings}>
//                                 {productDetails.images.map((img, index) => (
//                                     <img key={index} src={img} className='w-100' alt="" />
//                                 ))}
//                             </Slider>
//                         )}
//                     </div>
//                     <div className="col-md-9">
//                         <h2 className='mt-2'>{productDetails.title}</h2>
//                         <h5 className='font-sm text-main mt-2'>{productDetails.category?.name}</h5>
//                         <p className='mt-2'>{productDetails.description}</p>
//                         <p className='d-flex justify-content-between mt-2'>
//                             <span>{productDetails.price} EGP</span>
//                             <span>
//                                 <i className='fas fa-star rating-color me-1'></i>
//                                 <span>{productDetails.ratingsAverage}</span>
//                             </span>
//                         </p>
//                         <button className='btn bg-main text-white w-100 mt-2'>Add To Cart</button>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// export default ProductDetails;
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// export default function ProductDetails() {
//     let params = useParams();
//     const  [productDetails, setProductDetails] = useState(null);
//     console.log(params.id);

//     async function getProductDetails(id) {
//         let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
//         setProductDetails(data);
//     }
//     useEffect(() => {
//         getProductDetails(params.id);
//     }, []);
//     return (
//         <h1>Hi</h1>
//     );
// }

import React, { useContext } from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';


function ProductDetails() {
    const { addToCart } = useContext(CartContext);

    async function addProductToCart(productId) {
        let response = await addToCart(productId);
        if (response.data.status === 'success') {
            toast.success('Product is added successfully', {
                duration: 1000,
                position: 'top-center'
            })
        } else {
            toast.error('Failed Process', {
                duration: 1000,
                position: 'top-center'
            })
        }
        console.log(response);
    }

    let params = useParams();

    async function getProductDetails(id) {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    let { data } = useQuery('productDetails', () => getProductDetails(params.id))

    console.log(data?.data.data);

    return (
        <>
            {data?.data.data ? (
                <div className='row py-2 align-items-center'>
                    <Helmet>
                        <title>{data?.data.data.title}</title>
                    </Helmet>
                    <div className='col-md-4'>
                        <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />
                    </div>
                    <div className='col-md-8'>
                        <h2 className='h5'>{data?.data.data.title}</h2>
                        <p>{data?.data.data.description}</p>
                        <h6 className='text-main'>{data?.data.data.category.name}</h6>
                        <h6 className='text-main'>Price: {data?.data.data.price} EGP</h6>
                        <div className='d-flex justify-content-between'>
                            <span>Rating Quantity: {data?.data.data.ratingsQuantity}</span>
                            <span><i className='fas fa-star rating-color'></i> {data?.data.data.ratingsAverage}</span>
                        </div>
                        <button className='btn bg-main text-white w-100 mt-2' onClick={() => addProductToCart(data?.data.data._id)}> Add to Cart</button>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default ProductDetails;
