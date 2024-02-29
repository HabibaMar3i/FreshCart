import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { PaymentContext } from "../../Context/PaymentContext"; 

const validationSchema = Yup.object({
    details: Yup.string().required("Details is required"),
    phone: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be 11 digits")
        .required("Phone number is required"),
    city: Yup.string().required("City is required"),
});

function Payment() {
    const { getLoggedUserCart } = useContext(CartContext);
    const headers = useContext(PaymentContext);
    const [cartDetails, setCartDetails] = useState(null);
    useEffect(() => {
        async function fetchCart() {
            const { data } = await getLoggedUserCart();
            setCartDetails(data);
        }
        fetchCart();
    }, [getLoggedUserCart]);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    async function sendPaymentDetails(values) {
        try {
            setLoading(true);
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartDetails?._id}`, values, { headers }); // Include headers in request
            if (data.message === 'success') {
                navigate('/cart');
                setMsg('');
                setLoading(false);
                setCartDetails(null);
            }
        } catch (error) {
            setMsg(error.response.data.message);
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validationSchema,
        onSubmit: sendPaymentDetails,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {msg ? <p className='alert alert-danger'>{msg}</p> : ''}
            <div className="container justify-content-center align-items-center mt-2">
                <h1 className="h2">Payment:</h1>
                <div className="mb-3">
                    <label htmlFor="details" className="form-label">
                        Details
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="details"
                        name="details"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.details}
                    />
                    {formik.touched.details && formik.errors.details ? (
                        <div className="alert alert-danger p-2 mt-3">{formik.errors.details}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="alert alert-danger p-2 mt-3">{formik.errors.phone}</div>
                    ) : null}
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                        City
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                    />
                    {formik.touched.city && formik.errors.city ? (
                        <div className="alert alert-danger p-2 mt-3">{formik.errors.city}</div>
                    ) : null}
                </div>
                <button type="submit" className="btn bg-main text-white w-100" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </form>
    );
};

export default Payment;
