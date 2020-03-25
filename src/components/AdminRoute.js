import React from "react";
import { Route, Redirect } from "react-router-dom";
const AdminRoute = ({ component: Component, isAdmin, ...rest }) => {
  return (
    <Route
      render={props =>
        isAdmin ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
