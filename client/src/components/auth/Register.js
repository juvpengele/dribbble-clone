import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { request } from "../../utilities";
import { useTitle } from "../../hooks";
import { login } from "../../actions/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleFormErrors } from "../../utilities/helpers"

function Register(props) {
    const initialInputs = { name: "", username: "", email: "", password: "", tos: "on"};
    const [inputs, setInputs] = useState(initialInputs);
    const [loading, setLoading] = useState(false);
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("The name is required").min(2, "The name must have at least 2 characters"),
        username: Yup.string().required("The username is required").min(2, "The username must have at least 2 characters"),
        email: Yup.string().required("The email is required").email("You must provide a valid email adress"),
        password: Yup.string().required("The password is required").min(6, "The password must have at least 6 characters")
    });
    const formik = useFormik({
        initialValues: initialInputs, onSubmit: handleSubmit, validationSchema
    });


    useTitle("Register | Dribbble Clone");

    function handleInputChange(event) {
        setInputs({
            ...inputs, [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(attributes) {

        const user = await register(attributes);

        if(user) {
            _clearForm();
            props.login(user.data);
            props.history.push("/");
        }
    }

    async function register(attributes) {
        try {
            const { data } = await request().post("register", {
                ...attributes, tos: "on"
            });

            return data;
        } catch (error) {
            if(error.response.data){
                handleFormErrors(error.response.data, formik);
            }
           return null;
        } finally {
            setLoading(false);
        }
    }

    function _clearForm() {
        setInputs(initialInputs);
    }

    function getButtonText() {
        if(loading) {
            return "Loading...";
        }

        return "Create account";
    }

    return (
        <>
            <div className="container d-flex justify-content-end">
                <div className="pt-4 pr-4">
                    Already a member ? <Link to="/login">Sign In</Link>
                </div>
            </div>
            <div className="register">
                <div className="row">

                    <div className="col-md-7 mx-auto">
                    <h2 className="register__title">Sign up to Dribbble</h2>
                    <div className="row">
                        <div className="col-10">
                            <a href="#" className="btn btn-primary w-100 font-weight-bold">
                                Sign in with Google
                            </a>
                        </div>
                        <div className="col-2">
                            <a href="#" className="btn btn-light-gray w-100 h-100 d-flex
                        justify-content-center align-items-center">
                                <i className="la la-twitter"/>
                            </a>
                        </div>
                    </div>
                    <div className="register__separator"/>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name"
                                               name="name"
                                               value={formik.values.name}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.name && formik.errors.name &&
                                            <span className="text-danger">{ formik.errors.name}</span>
                                        }

                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" id="username"
                                               name="username" value={formik.values.username}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.username && formik.errors.username &&
                                            <span className="text-danger">{ formik.errors.username}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email"
                                               name="email" value={formik.values.email}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.email && formik.errors.email &&
                                            <span className="text-danger">{ formik.errors.email}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" placeholder="6+ characters"
                                               className="form-control"
                                               value={formik.values.password}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                               id="password"
                                        />
                                        {
                                            formik.touched.password && formik.errors.password &&
                                            <span className="text-danger">{ formik.errors.password}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                            <label className="form-check-label" htmlFor="defaultCheck1">
                                                Creating an account means you’re okay with our Terms of Service,
                                                Privacy Policy, and our default Notification Settings.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-12">
                                    <button className="btn btn-pink btn-custom" style={{ width: "200px"}}>{ getButtonText() }</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user))
    }
};

export default connect(null, mapDispatchToProps)(withRouter(Register));
