import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../models/Auth";
import { Alert, alertTypes } from "../components/Alert";
import { CommonContext } from "../components/App";

const HomePage = props => {
  const [password, setPassword] = useState("test");
  const [mail, setMail] = useState("test@gmail.com");
  const [error, setError] = useState("");
  const formRef = React.createRef();
  const { setLoading } = useContext(CommonContext);

  const onLogin = async e => {
    const i = formRef.current.reportValidity();
    if (!i) return;
    e.preventDefault();
    setLoading(true);
    const response = await auth.login({ mail, password });
    setLoading(false);
    if (!response) return;
    if (response.error) setError(response.error);
    if (response.username) props.history.push("/dashboard");
  };

  return (
    <React.Fragment>
      <section>
        <div className="center">
          <p className="text-center">Test your knowledge with TestMaster.</p>
          <p className="text-center">To proceed, please login.</p>
          <div className="form center">
            {error && <Alert text={error} type={alertTypes.danger} />}
            <form ref={formRef}>
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
                value="Login!"
                onClick={e => onLogin(e)}
                className="action btn"
              ></input>
            </form>

            <Link to="/register" className="btn muted">
              I don't have an account
            </Link>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default withRouter(HomePage);
