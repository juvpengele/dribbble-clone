import React from "react";
import {Link} from "react-router-dom";

import { useTitle } from "../../hooks";


function Register(props) {

    useTitle("Register | Dribbble Clone");

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
                        <form action="">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="name">Username</label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="name">Email</label>
                                        <input type="email" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="name">Password</label>
                                        <input type="password" placeholder="6+ characters" className="form-control"/>
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
                                    <button className="btn btn-pink btn-custom"
                                            style={{ width: "200px"}}
                                    >Create Account</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
