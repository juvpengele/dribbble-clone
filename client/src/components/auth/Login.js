import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../hooks";
import {request} from "../../utilities";

function Login(props) {

    useTitle("Login | Dribbble Clone");

    const [inputs, setInputs] = useState({ name: "", username: "", email: "", password: "", tos: "on"});

    function handleInputChange(event) {
        setInputs({
            ...inputs, [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const user = register();

        console.log(user);
    }

    async function register() {
        const URI = "register";
        try {
            const { data } = await request().post(URI, inputs);
            return data;

        } catch (error) {
            console.log(error);
        }
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
                                    <div className="col-12">
                                        <label htmlFor="email">Username or Email</label>
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
                                        <input type="password" className="form-control"
                                               name="password" value={inputs.password} onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <button className="btn btn-pink btn-custom" style={{ width: "200px"}}
                                        >Sign In</button>
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

export default Login;
