import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const NotFoundPage = () => {
  const [redirect, setRedirect] = useState(false);
  setTimeout(() => {
    setRedirect(true);
  }, 5000);
  return !redirect ? (
    <section className="text-center">
      <h1 className="bold gradient heading-1">404</h1>
      <h2 className="muted heading-2">Not Found</h2>
      <p className="muted">You'll be redirected to main page in 5 seconds...</p>
    </section>
  ) : (
    <Redirect to="/" />
  );
};

export default NotFoundPage;
