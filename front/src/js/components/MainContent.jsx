import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import MainPage from "../pages/MainPage";
import ProtectedRoute from "./ProtectedRoute";
import LogoutPage from "../pages/LogoutPage";
import DashboardPage from "../pages/DashboardPage";
import QuizzesPage from "../pages/QuizzesPage";
import QuizPage from "../pages/QuizPage";
import FeaturesPage from "../pages/FeaturesPage";
import CustomersPage from "../pages/CustomersPage";
import HelpPage from "../pages/HelpPage";
import LoginPage from "../pages/LoginPage";
import AboutUsPage from "../pages/AboutUsPage";
import SettingsPage from "../pages/SettingsPage";
import TestPage from "../pages/TestPage";

const MainContent = () => {
  return (
    <Switch>
      <ProtectedRoute isAuthRequired={false} path="/" exact>
        <LandingPage title="Home">
          <LoginPage />
        </LandingPage>
      </ProtectedRoute>
      <ProtectedRoute isAuthRequired={false} path="/register">
        <LandingPage title="Register">
          <RegisterPage />
        </LandingPage>
      </ProtectedRoute>
      <ProtectedRoute isAuthRequired={true} path="/logout">
        <LogoutPage />
      </ProtectedRoute>
      <ProtectedRoute isAuthRequired={true} path="/dashboard">
        <MainPage title="Dashboard">
          <DashboardPage />
        </MainPage>
      </ProtectedRoute>
      <ProtectedRoute isAuthRequired={true} path="/quizzes">
        <MainPage title="Quizzes">
          <QuizzesPage />
        </MainPage>
      </ProtectedRoute>
      <ProtectedRoute isAuthRequired={true} path="/quiz/:id">
        <MainPage>
          <QuizPage />
        </MainPage>
      </ProtectedRoute>
      <ProtectedRoute isAuthRequired={true} path="/test/:id">
        <MainPage>
          <TestPage />
        </MainPage>
      </ProtectedRoute>
      <Route path="/features">
        <MainPage title="Features">
          <FeaturesPage />
        </MainPage>
      </Route>
      <Route path="/customers">
        <MainPage title="Customers">
          <CustomersPage />
        </MainPage>
      </Route>
      <Route path="/help">
        <MainPage title="Help">
          <HelpPage />
        </MainPage>
      </Route>
      <Route path="/about">
        <MainPage title="About">
          <AboutUsPage />
        </MainPage>
      </Route>
      <Route path="/settings">
        <MainPage title="Settings">
          <SettingsPage />
        </MainPage>
      </Route>
      <Route path="*">
        <LandingPage title="Not Found">
          <NotFoundPage />
        </LandingPage>
      </Route>
    </Switch>
  );
};

export default withRouter(MainContent);
