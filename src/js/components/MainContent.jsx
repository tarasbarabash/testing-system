import React, { useContext } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import MainPage from "../pages/MainPage";
import ProtectedRoute from "./ProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import Dashboard from "./Dashboard";
import Quizzes from "./Quizzes";
import { LoadingContext } from "../models/Contexts";

const MainContent = () => {
  const setIsLoading = useContext(LoadingContext);
  return (
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
          <Dashboard setIsLoading={setIsLoading} />
        </MainPage>
      </ProtectedRoute>
      <ProtectedRoute isAuthRequired={true} path="/quizzes">
        <MainPage>
          <Quizzes setIsLoading={setIsLoading} />
        </MainPage>
      </ProtectedRoute>
      <Route path="/features">
        <MainPage>
          <div>Features</div>
        </MainPage>
      </Route>
      <Route path="/customers">
        <MainPage>
          <div>customers</div>
        </MainPage>
      </Route>
      <Route path="/help">
        <MainPage>
          <div>help</div>
        </MainPage>
      </Route>
      <Route path="/about">
        <MainPage>
          <div>about</div>
        </MainPage>
      </Route>
      <Route path="/settings">
        <MainPage>
          <div>settings</div>
        </MainPage>
      </Route>
      <Route path="*">
        <LandingPage>
          <NotFoundPage />
        </LandingPage>
      </Route>
    </Switch>
  );
};

export default withRouter(MainContent);
