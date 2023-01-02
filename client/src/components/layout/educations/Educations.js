import React from "react";
import { useSelector } from "react-redux";

import { Education } from "./Education";

export const Educations = ({ handleClick }) => {
  //Get data from profile redux store
  const educations = useSelector(
    (state) => state.register.profileData[0].education
  );
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
