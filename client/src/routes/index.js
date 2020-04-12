import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Layouts
import AuthRoutes from "./AuthRoutes";

// Components
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Home from "../pages/Home";


function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} exact />
                <AuthRoutes path="/login" component={Login} />
                <AuthRoutes path="/register" component={Register}/>
            </Switch>
        </Router>
    )
}

export default Routes;