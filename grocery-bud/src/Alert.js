import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    //now we call the removeAlert i.e showAlert.  It has now show="false".  So after 2000ms we call it means the show is false then the alert will not display because show is false
    const timeout = setTimeout(removeAlert, 2000);
    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
