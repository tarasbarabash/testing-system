import React from "react";
import "../styles/scss/alert.scss";

const alertTypes = {
  danger: 1
};

const Alert = props => {
  let alertType;
  switch (props.type) {
    case alertTypes.danger:
      alertType = "danger";
      break;
  }
  return (
    <div className={`alert text-center alert-${alertType}`}>{props.text}</div>
  );
};

export { Alert, alertTypes };
