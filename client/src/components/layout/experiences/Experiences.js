import React from "react";
import { useSelector } from "react-redux";

import { Experience } from "./Experience";

export const Experiences = ({handleClick}) => {
  //Get data from profile redux store
  const experiences = useSelector(
    (state) => state.register.profileData[0].experience
  );
  const loading = useSelector((state) => state.register.loading);
  console.log(experiences);
  return (
    <>
      {
        /* !loading && */
        experiences.map((experience) => (
          <Experience data={experience} key={experience._id} handleClick={handleClick} />
        ))
      }
    </>
  );
};
