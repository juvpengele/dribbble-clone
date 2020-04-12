import React from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../hooks";

function Login(props) {

    useTitle("Login | Dribbble Clone");

    return (
        <div>
            Login page
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login;
