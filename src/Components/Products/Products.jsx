import React, { useState } from "react";
import Product from "../Product/Product";
import axios from "axios";
import { useQuery } from "react-query";

function Products() {

    function getAllProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    const { data, isLoading, isFetching } = useQuery('products', getAllProducts, {
        cacheTime: 2000,
        refetchOnMount: false
    });

    console.log(data?.data.data);
    console.log("Is Loading: " + isLoading);
    console.log("Is Fetching: " + isFetching);

    let [searchedArr, setSearchedArr] = useState([]);

    function search(e) {
        let term = e.target.value;
        let newArr = data?.data.data.filter((ele) => ele.title.toLowerCase().includes(term.toLowerCase().trim()));
        setSearchedArr(newArr);
    }

    return (
        <div>
            {isLoading ? (
                <div className="position-absolute top-50 start-50 translate-middle text-main">
                    <i className="fa fa-spinner fa-3x fa-spin" aria-hidden="true"></i>
                </div>
            ) : (
                <div className="container mt-4">
                    <input type="text" className="form-control mb-3" placeholder="Search" onChange={search} />
                    <div className="row">
                        {searchedArr.length > 0 ? (
                            searchedArr.map((product) => (
                                <div key={product.id} className="col-md-3">
                                    <Product product={product} />
                                </div>
                            ))
                        ) : (
                            data?.data.data.map((product) => (
                                <div key={product.id} className="col-md-3">
                                    <Product product={product} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;
