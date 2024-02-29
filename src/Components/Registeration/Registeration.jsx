// import { useFormik } from "formik";
// let emailregex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
// let phoneregex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
// function registerSubmit(values) {
//     console.log(values);
// }
// function validate(values) {
//     let errors = {};

//     if (!values.name) {
//         errors.name = 'Name is required';
//     } else if (values.name.length < 3 || values.name.length > 10) {
//         errors.name = 'Name must be between 3 and 10 characters';
//     }

//     if (!values.email) {
//         errors.email = 'Email is required';
//     } else if (!emailregex.test(values.email)) {
//         errors.email = 'Invalid email format';
//     }

//     if (!values.password) {
//         errors.password = 'Password is required';
//     } else if (values.password.length < 8) {
//         errors.password = 'Password must be at least 8 characters';
//     }

//     if (!values.rePassword) {
//         errors.rePassword = 'Confirmation password is required';
//     } else if (values.password !== values.rePassword) {
//         errors.rePassword = 'Passwords do not match';
//     }

//     if (!values.phone) {
//         errors.phone = 'Phone is required';
//     } else if (!phoneregex.test(values.phone)) {
//         errors.phone = 'Invalid phone number format';
//     }

//     return errors;
// }
// function Registration() {
//     const formik = useFormik({
//         initialValues: {
//             name: "",
//             email: "",
//             password: "",
//             rePassword: "",
//             phone: ""
//         },
//         onSubmit: registerSubmit,
//         validate: validate
//     });
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div className="container">
//                 <h2>Register Now:</h2>
//                 <div className="mb-3">
//                     <label htmlFor="name" className="form-label">Name</label>
//                     <input type="text" className="form-control" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
//                     {formik.errors.name && formik.touched.name ? <div className="alert alert-danger p-2 mt-3">{formik.errors.name}</div> : ""}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input type="email" className="form-control" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
//                     {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-3">{formik.errors.email}</div> : ""}
//                     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input type="password" className="form-control" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
//                     {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-2 mt-3">{formik.errors.password}</div> : ""}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="rePassword" className="form-label">Confirm Password</label>
//                     <input type="password" className="form-control" id="rePassword" name="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} />
//                     {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger p-2 mt-3">{formik.errors.rePassword}</div> : ""}
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="phone" className="form-label">Phone</label>
//                     <input type="text" className="form-control" id="phone" name="phone" onChange={formik.handleChange} value={formik.values.phone} />
//                     {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-2 mt-3">{formik.errors.phone}</div> : ""}
//                 </div>
//                 <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#0aad0a" }}>Register</button>

//             </div>
//         </form>
//     );
// }
// export default Registration;
import { useFormik } from "formik";
import { Audio } from 'react-loader-spinner';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

let phoneregex = /^\+(?:[0-9] ?){6,14}[0-9]$/;


let validationSchema = Yup.object({
    name: Yup.string().min(2, 'Too Short!').max(10, 'Too Long').required('Name is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    phone: Yup.string().matches(phoneregex, 'Invalid Phone Number').required("Phone number is Required"),
    password: Yup.string().min(8, 'Too Short!').max(10, 'Too Long').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Confirmation password is required')
})

function Registration() {
    const navigate = useNavigate()
    let [loading, setLoading] = useState(false)
    let [msg, setMsg] = useState('')
    async function getRegister(values) {
        try {
            setLoading(true)
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            if (data.message === 'success') {
                navigate('/')
                setMsg('');
                setLoading(false)
            }
        } catch (error) {
            setMsg(error.response.data.message);
            setLoading(false)
        }
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema,
        onSubmit: getRegister,

    });
    return (
        <><Helmet>
            <meta />
            <title>Registration</title>
        </Helmet>
            <form onSubmit={formik.handleSubmit}>
                {msg ? <p className='alert alert-danger'>{msg}</p> : ''}
                <div className="container">
                    <h2>Register Now:</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} />
                        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger p-2 mt-3">{formik.errors.name}</div> : ""}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
                        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-3">{formik.errors.email}</div> : ""}
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
                        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-2 mt-3">{formik.errors.password}</div> : ""}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rePassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="rePassword" name="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} />
                        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger p-2 mt-3">{formik.errors.rePassword}</div> : ""}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="phone" name="phone" onChange={formik.handleChange} value={formik.values.phone} />
                        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-2 mt-3">{formik.errors.phone}</div> : ""}
                    </div>
                    <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="btn btn-primary" style={{ backgroundColor: "#0aad0a" }}>{loading ? <Audio
                        height="20"
                        width="80"
                        radius="9"
                        color="green"
                        ariaLabel="loading"
                        wrapperStyle
                        wrapperClass
                    /> : 'Register'}</button>

                </div>
            </form>
        </>
    );
}
export default Registration;