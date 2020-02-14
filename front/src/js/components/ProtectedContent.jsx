import React from "react";
import { auth, authStates } from "../models/Auth";

const ProtectedContent = ({ children }) => {
  return auth._state === authStates.authorised && children;
};

export default ProtectedContent;
