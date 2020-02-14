import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authStates, auth } from "../models/Auth";

const ProtectedRoute = ({ children, isAuthRequired, ...rest }) => {
  const authorised = auth._state === authStates.authorised;
  let element;
  if (authorised) {
    if (isAuthRequired) element = { ...children };
    else element = <Redirect to="/dashboard" />;
  } else {
    if (isAuthRequired) element = <Redirect to="/" />;
    else element = { ...children };
  }
  return <Route {...rest}>{element}</Route>;
};

export default ProtectedRoute;
