import { useQuery } from "react-query";
import axios from "axios";
import CategoriesModal from "../CategoriesModal/CategoriesModal";
import SubCategories from "../SubCategories/SubCategories";

function Categories() {
    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }

    function getSubCategories() {
        return axios.get('https://route-ecommerce.onrender.com/api/v1/subcategories');
    }

    const { data, isLoading } = useQuery('categories', getCategories, {
        cacheTime: 2000,
        refetchOnMount: false
    });



    return (
        <div className="container p-2">
            <div className="row">
            <h2 className="text-center text-main fw-bold">Categories</h2>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    data?.data.data.map((category) => (
                        <div key={category.id} className="col-md-4 p-3">
                            <CategoriesModal category={category} />
                        </div>
                    ))
                )}
            </div>
            <div className="row">
                <h2 className="text-center text-main fw-bold">SubCategories</h2>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    data?.data.data.map((subcategories) => (
                        <div key={subcategories.id} className="col-md-4 p-3">
                            <SubCategories subcategories={subcategories} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Categories;
