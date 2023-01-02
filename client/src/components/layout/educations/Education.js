import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../../store/features/actions";
import Loading from "../Loading";

export const Education = ({ education, handleClick }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { _id, school, degree, fieldofstudy, from, to, current, description } =
    education;

  const handleDeleteEducation = (e) => {
    setLoading(true);
    e.preventDefault();

    dispatch(deleteEducation(_id));
    const interval = setTimeout(() => {
      handleClick();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(interval);
  };

  return (
    <tr>
      <td>{school}</td>
      <td className="hide-sm">{degree}</td>
      <td className="hide-sm">
        {from.slice(0, 10)}{" "}
        {current ? " - Ongoing" : to ? ` - ${to.slice(0, 10)}` : ""}
      </td>
      <td>
        {loading ? (
          <Loading />
        ) : (
          <button className="btn btn-danger" onClick={handleDeleteEducation}>
            Delete
          </button>
        )}
      </td>
    </tr>
  );
};
