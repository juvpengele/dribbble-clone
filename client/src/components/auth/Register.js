import React, { useState } from "react";
import {Link} from "react-router-dom";

import { request } from "../../utilities";
import { useTitle } from "../../hooks";

function Register(props) {

    useTitle("Register | Dribbble Clone");

    const [inputs, setInputs] = useState({
        name: "", username: "", email: "", password: "", tos: "on"
    });

    function handleInputChange(event) {
        setInputs({
            ...inputs, [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const user = await register();

    }

    async function register() {
        try {
            const { data } = await request().post("register", inputs);

            return data;
        } catch (error) {
            console.log(error);
        }
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
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control"
                                            name="name" value={inputs.name} onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" id="username"
                                               name="username" value={inputs.username} onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" id="email"
                                               name="email" value={inputs.email} onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" placeholder="6+ characters" className="form-control"
                                               name="password" value={inputs.password} onChange={handleInputChange}
                                        />
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
                                    <button className="btn btn-pink btn-custom" style={{ width: "200px"}}
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
