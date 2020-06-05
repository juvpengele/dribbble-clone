import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../hooks";
import {request} from "../../utilities";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleFormErrors } from "../../utilities/helpers";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


function Login(props) {

    useTitle("Login | Dribbble Clone");

    const attributes = { login: "", password: ""};
    const validationSchema = Yup.object().shape({
       login: Yup.string().required("The username / login field is required").min(2, "The username / login field must have at least 2 characters"),
       password: Yup.string().required("The password field is required").min(6, "The password field must have at least 6 characters")
    });
    const formik = useFormik({
        validationSchema, initialValues: attributes, onSubmit: handleSubmit
    });
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formValues) {

        const user = await signIn(formValues);

        if(user) {
            props.login(user.data);
            props.history.push("/");
        }
    }

    async function signIn(formAttributes) {
        setLoading(true);
        try {
            const { data } = await request().post("login", formAttributes);
            return data;

        } catch (error) {
            if(error.response.data) {
                handleFormErrors(error.response.data, formik);
            }

            return null;
        } finally {
            setLoading(false);
        }
    }

    function getButtonText() {
        if(loading) {
            return "Loading...";
        }
        return "Sign In";
    }

    return (
        <>
            <div className="container d-flex justify-content-end">
                <div className="pt-4 pr-4">
                    Not a member ? <Link to="/register">Sign Up now</Link>
                </div>
            </div>
            <div className="register">
                <div className="row">

                    <div className="col-md-7 mx-auto">
                        <h2 className="register__title">Sign in to Dribbble</h2>
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
                                    <div className="col-12">
                                        <label htmlFor="login">Username or Email</label>
                                        <input type="text" className="form-control" id="login"
                                               value={formik.values.login}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.login && formik.errors.login &&
                                            <span className="text-danger">{ formik.errors.login}</span>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control"
                                               id="password"
                                               value={formik.values.password}
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
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
                                        <button className="btn btn-pink btn-custom"
                                                style={{ width: "200px"}} type="submit"
                                        >{ getButtonText() }</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({
   login(user) {
       dispatch(login(user));
   }
});

export default connect(null, mapDispatchToProps)(withRouter(Login));
