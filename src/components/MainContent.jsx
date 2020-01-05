import React, { useContext, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import Loading from "./Loading";
import { LoadingContext } from "../js/models/Contexts";

const MainContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={setIsLoading}>
      {isLoading && <Loading />}
      <Switch>
        <Route path="/" exact>
          <LandingPage>
            <HomePage />
          </LandingPage>
        </Route>
        <Route path="/register">
          <LandingPage>
            <RegisterPage />
          </LandingPage>
        </Route>
        <Route path="/dashboard">
          <div>Logout</div>
        </Route>
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
