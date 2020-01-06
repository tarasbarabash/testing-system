import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authStates, auth } from "../models/Auth";

const ProtectedRoute = ({ children, isAuthRequired, ...rest }) => {
  const authorised = auth._state === authStates.authorised;
  return (
    <Route {...rest}>
      {isAuthRequired === authorised ? (
        { ...children }
      ) : (
        <Redirect to={isAuthRequired ? "/" : "/dashboard"}></Redirect>
      )}
    </Route>
  );
};

export default ProtectedRoute;
