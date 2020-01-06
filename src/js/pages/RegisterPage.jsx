import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../models/Auth";
import { LoadingContext } from "../models/Contexts";
import { Alert, alertTypes } from "../components/Alert";

const RegisterPage = props => {
  const [password, setPassword] = useState("test");
  const [mail, setMail] = useState("test@gmail.com");
  const [username, setUsername] = useState("test");
  const [error, setError] = useState("");
  const formRef = React.createRef();
  const setIsLoading = useContext(LoadingContext);

  const onSignup = async e => {
    const i = formRef.current.reportValidity();
    if (!i) return;
    e.preventDefault();
    setIsLoading(true);
    const response = await auth.signup({ mail, password, name: username });
    setIsLoading(false);
    if (!response) return;
    if (response.error) setError(response.error);
    if (response.username) props.history.push("/dashboard");
  };

  return (
    <div className="form center">
      {error && <Alert type={alertTypes.danger} text={error} />}
      <form ref={formRef}>
        <div className="form-group">
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
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
            placeholder="test@test.com"
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
            placeholder="test"
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
  );
};

export default withRouter(RegisterPage);
