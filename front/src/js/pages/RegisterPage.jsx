import React, { useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../models/Auth";
import { Alert, alertTypes } from "../components/Alert";
import { CommonContext } from "../components/App";

const RegisterPage = props => {
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const formRef = React.createRef();
  const { setLoading } = useContext(CommonContext);

  const onSignup = async e => {
    const i = formRef.current.reportValidity();
    if (!i) return;
    e.preventDefault();
    setLoading(true);
    const response = await auth.signup({ mail, password, name: username });
    setLoading(false);
    if (!response) return;
    if (response.error) setError(response.error);
    if (response.username) props.history.replace("/dashboard");
  };

  return (
    <section>
      <div className="center">
        <p className="text-center">
          To create an account, please fill the form below.
        </p>
        <p className="text-center">All fields are required.</p>
        <div className="form center">
          {error && (
            <Alert
              type={alertTypes.danger}
              text={error}
              setMessage={setError}
            />
          )}
          <form ref={formRef}>
            <div className="form-group">
              <label htmlFor="username">Name:</label>
              <input
                type="text"
                onChange={e => setUsername(e.target.value)}
                placeholder="Name"
                id="username"
                value={username}
                required
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="mail">E-mail:</label>
              <input
                type="email"
                onChange={e => setMail(e.target.value)}
                placeholder="E-mail"
                id="mail"
                value={mail}
                required
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                id="password"
                value={password}
                required
              ></input>
            </div>
            <input
              type="submit"
              value="Signup!"
              onClick={e => onSignup(e)}
              className="action btn"
            ></input>
          </form>

          <Link to="/" className="btn muted">
            I have an account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default withRouter(RegisterPage);
