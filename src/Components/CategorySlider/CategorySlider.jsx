import axios from "axios";
import { useQuery } from "react-query";
import React from "react";
import Slider from "react-slick";


function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
    };

    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }

    let { data } = useQuery('categorySlider', getCategories);
    console.log(data?.data.data);

    return (
        <div className="py-3">
            {data?.data.data ? (
                <Slider {...settings}>
                    {data?.data.data.map((category) => (
                        <>
                            <img height={200} key={category._id} src={category.image} className="w-100" alt={category.name} />
                            <h6 className="fw-bolder text-center">{category.name}</h6>
                        </>
                    ))}
                </Slider>
            ) : ''}
        </div>
    );
}

export default CategorySlider;

