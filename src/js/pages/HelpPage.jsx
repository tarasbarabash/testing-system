import React, { useState, useRef, useContext } from "react";
import { Alert, alertTypes } from "../components/Alert";
import { CommonContext } from "../components/App";
import Request from "../models/Request";

const HelpPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setLoading } = useContext(CommonContext);
  const [topic, setTopic] = useState("");
  const [mail, setMail] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef();
  const onSend = async e => {
    const i = formRef.current.reportValidity();
    if (!i) return;
    e.preventDefault();
    setLoading(true);
    const { done } = await Request.call({
      reqMethod: "POST",
      link: "/feedback/new",
      data: {
        mail,
        topic,
        message
      }
    });
    if (done) setSuccess("Your message was sent!");
    else setError("Something went wrong, please try again later!");
    setLoading(false);
  };

  return (
    <div className="center">
      <div className="container">
        <div className="content">
          <h3 className="heading-4">Help</h3>
          <p className="muted">
            Have any questions? Contact us using the form below!
          </p>
          <div className="form">
            {error && <Alert type={alertTypes.danger} text={error} />}
            {success && <Alert type={alertTypes.success} text={success} />}
            <form ref={formRef}>
              <div className="form-group">
                <label htmlFor="topic">Topic:</label>
                <input
                  type="text"
                  onChange={e => setTopic(e.target.value)}
                  id="topic"
                  value={topic}
                  required
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="mail">E-mail:</label>
                <input
                  type="email"
                  onChange={e => setMail(e.target.value)}
                  id="mail"
                  value={mail}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="text">Message:</label>
                <textarea
                  id="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Send!"
                onClick={e => onSend(e)}
                className="action btn"
              ></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
