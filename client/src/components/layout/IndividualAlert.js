import React from "react";
import "../../App.css";

export const IndividualAlert = ({ msg }) => {
  return <p className=" alert-message danger danger-animation">{msg}</p>;
};
