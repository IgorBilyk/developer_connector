import React from "react";
import { useSelector } from "react-redux";

import { Education } from "./Education";

export const Educations = ({ handleClick, educations }) => {
  return (
    <>
      {educations.map((education) => (
        <Education
          education={education}
          key={education._id}
          handleClick={handleClick}
        />
      ))}
    </>
  );
};
