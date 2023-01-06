import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../../store/features/actions";

import Loading from "../Loading";

export const Experience = ({ data, handleClick }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { _id, company, title, location, from, to, current, description } =
    data;
  const user_id = JSON.parse(localStorage.getItem("data"))._id;
  const handleDeleteExperience = (e) => {
    setLoading(true);
    e.preventDefault();

    dispatch(deleteExperience({ experience_id: _id, user_id }));
    const interval = setTimeout(() => {
      handleClick();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(interval);
  };
  const descr = !description ? " " : description;
  return (
    <tr>
      <td data-hover={`Description: ${descr}`} className="hovertext">
        {company}
      </td>
      <td className="hide-sm hovertext" data-hover={`Description: ${descr}`}>
        {title}
      </td>
      <td className="hide-sm hovertext" data-hover={`Description: ${descr}`}>
        {from.slice(0, 10)}{" "}
        {current ? " - Ongoing" : to ? ` - ${to.slice(0, 10)}` : ""}
      </td>
      <td>
        {loading ? (
          <Loading />
        ) : (
          <button className="btn btn-danger" onClick={handleDeleteExperience}>
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};
