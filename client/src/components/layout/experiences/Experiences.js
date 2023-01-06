import React from "react";
import { useSelector } from "react-redux";

import { Experience } from "./Experience";

export const Experiences = ({ handleClick,experiences }) => {
  //Get data from profile redux store
 /*  const experiences = useSelector(
    (state) => state.register.profileData[0]?.experience
  ); */

  return (
    <>
      {experiences.map((experience) => (
        <Experience
          data={experience}
          key={experience._id}
          handleClick={handleClick}
        />
      ))}
    </>
  );
};
