// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Product from "../Product/Product";

// function Home() {
//     const [products, setProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     async function getAllProducts() {
//         try {
//             const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
//             setProducts(data.data);
//             setIsLoading(false);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             setIsLoading(false);
//         }
//     }

//     useEffect(() => {
//         getAllProducts();
//     }, []);

//     return (
//         <div className="row">
//             {isLoading ? (
//                 <div className="position-absolute top-50 start-100 translate-middle text-main">
//                     <i className="fa fa-spinner fa-3x fa-spin" aria-hidden="true"></i>
//                 </div>
//             ) : (
//                 products.map((product) => (
//                     <div key={product.id} className="col-md-3">
//                         <Product product={product} />
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default Home;
import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import Products from "../Products/Products";

function Home() {
    return (
        <>
            <Helmet>
                <meta />
                <title>Fresh Cart Home</title>
            </Helmet>
            <MainSlider></MainSlider>
            <CategorySlider></CategorySlider>
            <Products></Products>
        </>
    );
}

export default Home;

