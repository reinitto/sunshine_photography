import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, isSignedIn, ...rest }) => {
  return (
    <Route
      exact
      path="/:lang/dashboard"
      render={(props) =>
        isSignedIn ? (
          <Suspense fallback={<div></div>}>
            <Component {...props} {...rest} />
          </Suspense>
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
