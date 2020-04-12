import React from "react";
import { Link } from "react-router-dom";


function Login(props) {
    return (
        <div>
            Login page
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login;
