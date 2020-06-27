import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
const AdminRoute = ({ component: Component, isAdmin, ...rest }) => {
  return (
    <Route
      exact
      path="/:lang/admin"
      render={(props) =>
        isAdmin ? (
          <Suspense
            fallback={
              <div style={{ height: "100vh", width: "100%" }}>Loading</div>
            }
          >
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

export default AdminRoute;
