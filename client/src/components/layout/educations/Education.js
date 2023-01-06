import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../../store/features/actions";
import Loading from "../Loading";

export const Education = ({ education, handleClick }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { _id, school, degree, fieldofstudy, from, to, current, description } =
    education;
  const user_id = JSON.parse(localStorage.getItem("data"))._id;
  const handleDeleteEducation = (e) => {
    setLoading(true);
    e.preventDefault();
    //Delete Education [Redux function]
    dispatch(deleteEducation({ _id, user_id }));
    const interval = setTimeout(() => {
      handleClick();
      setLoading(false);
    }, 1000);
    return () => clearTimeout(interval);
  };
  return (
    <tr>
      <td className="hovertext"   data-hover={`${description} ? Description: ${description}:''`}>
        {school}
      </td>
      <td
        className="hide-sm hovertext"
        data-hover={`${description} ? Description: ${description}:''`}
      >
        {degree}
      </td>
      <td className="hide-sm hovertext"   data-hover={`${description} ? Description: ${description}:''`}>
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
