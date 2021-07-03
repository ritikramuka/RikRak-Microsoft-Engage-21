import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

function PrivateRoutes({ component: Component, ...rest }) {
  const { currUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currUser ? <Component {...props} /> : <Redirect to="/main" />;
      }}
    ></Route>
  );
}

export default PrivateRoutes;
