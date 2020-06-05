import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {logout} from "../actions/auth";


function Home(props) {
    return (
        <>
            <div>
                {
                    props.auth === null && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )
                }
                {
                    props.auth && <button onClick={() => props.logout()}>Logout</button>
                }

            </div>
            <div>
                Home
            </div>
        </>

    )
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = dispatch => ({
    logout : () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
