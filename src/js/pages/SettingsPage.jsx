import React, { useRef, useState, useContext } from "react";
import { Alert, alertTypes } from "../components/Alert";
import Request from "../models/Request";
import { auth } from "../models/Auth";
import { CommonContext } from "../components/App";

const SettingsPage = () => {
  const nameFormRef = useRef();
  const passwordFormRef = useRef();
  const { setLoading } = useContext(CommonContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeName = async e => {
    const i = nameFormRef.current.reportValidity();
    e.preventDefault();
    if (!i) return;
    if (!name.trim()) return setError("Name field should not be empty!");
    setLoading(true);
    const response = await updateRequest("name", { name });
    if (response.error) setError(response.error);
    else {
      setSuccess(`Name was successfully changed to ${name}!`);
      auth.username = response.user.name;
      setName("");
    }
    setLoading(false);
  };

  const onChangePassword = async e => {
    const i = passwordFormRef.current.reportValidity();
    e.preventDefault();
    if (!i) return;
    if (!oldPassword.trim()) return setError("Old password can not be empty!");
    if (!newPassword.trim()) return setError("New password can not be empty!");
    if (!confirmPassword.trim())
      return setError("Confirm password can not be empty!");
    if (newPassword !== confirmPassword)
      return setError("Passwords don't match!");
    setLoading(true);
    const response = await updateRequest("password", {
      old: oldPassword,
      password: newPassword
    });
    if (response.error) setError(response.error);
    else {
      setSuccess("");
      setSuccess("Password was successfully changed!");
      setNewPassword("");
      setOldPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  const updateRequest = (field, data) => {
    const response = Request.call({
      reqMethod: "POST",
      link: `/user/update/${field}`,
      data
    });
    return response;
  };

  return (
    <section className="center">
      <div className="container">
        <div className="content">
          <h3 className="heading-4">Settings</h3>
          {error && <Alert type={alertTypes.danger} text={error} />}
          {success && <Alert type={alertTypes.success} text={success} />}
          <h4 className="heading-5">Change Display Name</h4>
          <div className="form">
            <div className="form">
              <form ref={nameFormRef}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    onChange={e => setName(e.target.value)}
                    id="name"
                    value={name}
                    required
                  ></input>
                </div>
                <input
                  type="submit"
                  value="Change name!"
                  onClick={e => onChangeName(e)}
                  className="action btn"
                ></input>
              </form>
            </div>
          </div>
          <h4 className="heading-5">Change Password</h4>
          <div className="form">
            <div className="form">
              <form ref={passwordFormRef}>
                <div className="form-group">
                  <label htmlFor="old">Old:</label>
                  <input
                    type="password"
                    onChange={e => setOldPassword(e.target.value)}
                    id="old"
                    value={oldPassword}
                    required
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="new">New:</label>
                  <input
                    type="password"
                    onChange={e => setNewPassword(e.target.value)}
                    id="new"
                    value={newPassword}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="confirm">Confirm:</label>
                  <input
                    type="password"
                    onChange={e => setConfirmPassword(e.target.value)}
                    id="confirm"
                    value={confirmPassword}
                  ></input>
                </div>
                <input
                  type="submit"
                  value="Change password!"
                  onClick={e => onChangePassword(e)}
                  className="action btn"
                ></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;
