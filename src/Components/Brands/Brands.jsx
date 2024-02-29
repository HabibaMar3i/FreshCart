import React from "react"
import BrandModal from "../BrandModal/BrandModal"
import axios from "axios";
import { useQuery } from "react-query";


function Brands() {
    function getBrands() {
        return axios.get('https://route-ecommerce.onrender.com/api/v1/brands');
    }
    const { data, isLoading } = useQuery('Brand', getBrands, {
        cacheTime: 2000,
        refetchOnMount: false
    });
    return <>
        
        <div className="container">
        <h1 className="text-center text-main fw-bold">All Brands</h1>
            <div className="row">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    data?.data.data.map((brands) => (
                        <div key={brands.id} className="col-md-3 p-3">
                            <BrandModal brands={brands} />
                        </div>
                    ))
                )}
            </div>
        </div>

    </>;
}

export default Brands;
