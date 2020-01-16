import React, { useRef, useEffect } from "react";
import "../../styles/scss/alert.scss";

const alertTypes = {
  danger: 1,
  success: 2
};

const Alert = props => {
  const alertRef = useRef();
  useEffect(() => {
    alertRef.current.classList.remove("fadeOut");
    alertRef.current.classList.add("fadeIn");

    setTimeout(() => {
      alertRef.current.classList.remove("fadeIn");
      alertRef.current.classList.add("fadeOut");
    }, 5000);
  }, [props.text]);

  let alertType;
  switch (props.type) {
    case alertTypes.danger:
      alertType = "danger";
      break;
    case alertTypes.success:
      alertType = "success";
      break;
  }
  return (
    <div
      className={`alert text-center alert-${alertType} fadeIn`}
      ref={alertRef}
    >
      {props.text}
    </div>
  );
};

export { Alert, alertTypes };
