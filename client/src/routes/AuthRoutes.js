import React from "react";
import { Route } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

function AuthRoutes({ component : Component, ...rest }) {
    return (
       <Route {...rest} render={props => (
               <AuthLayout>
                   <Component {...props} />
               </AuthLayout>
           )}
       />
    )
}

export default AuthRoutes;