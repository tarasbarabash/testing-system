import React, { Component, useContext, useState, useEffect } from "react";
import { auth } from "../models/Auth";
import { Redirect } from "react-router-dom";
import { CommonContext } from "../components/App";

const LogoutPage = () => {
  const { setLoading } = useContext(CommonContext);
  const [out, setOut] = useState(false);
  const [done, setDone] = useState(false);
  const onPageLoaded = () => {
    setLoading(true);
    auth.logout().then(result => {
      setOut(result);
      setDone(true);
      setLoading(false);
    });
  };

  useEffect(onPageLoaded, []);

  if (done) return <Redirect to={out ? "/" : "/dashboard"}></Redirect>;
  else return <div>Logout</div>;
};

export default LogoutPage;
