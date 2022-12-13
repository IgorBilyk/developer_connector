import React from "react";
import { useDispatch } from "react-redux";
import { deleteExperience } from "../../../store/features/actions";

export const Experience = ({ data }) => {
  const dispatch = useDispatch();
  const { _id, company, title, location, from, to, current, description } =
    data;

  /*   console.log(from.slice(0, 10)); */
  const handleDeleteExperience = () => {
    dispatch(deleteExperience(_id));
    console.log("deleted", _id);
  };
  return (
    <tr>
      <td>{company}</td>
      <td className="hide-sm">{title}</td>
      <td className="hide-sm">
        {from.slice(0, 10)} {current ? " - Ongoing" : to ? ` - ${to}` : ""}
      </td>
      <td>
        <button className="btn btn-danger" onClick={handleDeleteExperience}>
          Delete
        </button>
      </td>
    </tr>
  );
};
