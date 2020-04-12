import React from "react";
import {Link} from "react-router-dom";


function Register(props) {
    return (
        <div className="row">
            <div className="container d-flex justify-content-end">
                <div className="pt-4 pr-4">
                    Already a member ? <Link to="/login">Sign In</Link>
                </div>
            </div>

            <div className="col-md-8 mx-auto">
                <h2>Sign up to Dribbble</h2>
            </div>

        </div>
    )
}

export default Register;
