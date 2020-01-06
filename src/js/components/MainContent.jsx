import React, { useContext, useState, useEffect } from "react";
import { Switch, Route, withRouter, Link } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import Loading from "./Loading";
import { LoadingContext } from "../models/Contexts";
import MainPage from "../pages/MainPage";
import ProtectedRoute from "./ProtectedRoute";
import LogoutPage from "../pages/LogoutPage";

const MainContent = props => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(props.loading);
  }, [props.loading]);

  return (
    <LoadingContext.Provider value={setIsLoading}>
      {isLoading && <Loading />}
      <Switch>
        <ProtectedRoute isAuthRequired={false} path="/" exact>
          <LandingPage>
            <HomePage />
          </LandingPage>
        </ProtectedRoute>
        <ProtectedRoute isAuthRequired={false} path="/register">
          <LandingPage>
            <RegisterPage />
          </LandingPage>
        </ProtectedRoute>
        <ProtectedRoute isAuthRequired={true} path="/logout">
          <LogoutPage setIsLoading={setIsLoading} />
        </ProtectedRoute>
        <ProtectedRoute isAuthRequired={true} path="/dashboard">
          <MainPage>
            <Link to="/logout">Logout</Link>
          </MainPage>
        </ProtectedRoute>
        <Route path="*">
          <LandingPage>
            <NotFoundPage />
          </LandingPage>
        </Route>
      </Switch>
    </LoadingContext.Provider>
  );
};

export default withRouter(MainContent);
