import { useFormik } from "formik";
import { Audio } from 'react-loader-spinner';
import * as Yup from 'yup'
import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from 'react-router-dom';

let validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().min(8, 'Too Short!').max(10, 'Too Long').required('Password is required')
})

function Login() {
    let { setUserToken, setUserData } = useContext(UserContext)
    const navigate = useNavigate()
    let [loading, setLoading] = useState(false)
    let [msg, setMsg] = useState('')
    async function LoginSubmit(values) {
        try {
            setLoading(true)
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            if (data.message === 'success') {
                console.log(data.token);
                navigate('/home');
                setMsg('');
                setLoading(false);
                localStorage.setItem('userToken', data.token);
                setUserToken(data.token);
                setUserData(data.user)
            }
        } catch (error) {
            setMsg(error.response.data.message);
            setLoading(false)
        }
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: LoginSubmit,

    });
    return (
        <>
            <Helmet>
                <meta />
                <title>Login</title>
            </Helmet>
            <form onSubmit={formik.handleSubmit}>
                {msg ? <p className='alert alert-danger'>{msg}</p> : ''}
                <div className="container">
                    <h2>Login Now:</h2>
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
                    <div className="d-flex">
                        <Link className="d-inline ms-0 py-3 forgetpassword fw-semibold" to="/forgetpassword">Forgot your Password?</Link>
                    </div>
                    <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="btn btn-primary " style={{ backgroundColor: "#0aad0a" }}>{loading ? <Audio
                        height="20"
                        width="80"
                        radius="9"
                        color="green"
                        ariaLabel="loading"
                        wrapperStyle
                        wrapperClass
                    /> : 'Login'}</button>

                </div>
            </form>
        </>
    );
}
export default Login;