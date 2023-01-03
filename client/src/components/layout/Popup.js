import React from "react";
import { useDispatch } from "react-redux";

import { deleteUserProfile } from "../../store/features/actions";

import "../../App.css";
export const Popup = ({ active, closePopup }) => {
  const dispatch = useDispatch();

  //Get user id from Local Storage
  //Remove User profile/account
  const user_id = JSON.parse(localStorage.getItem("data"))._id;
  const refreshToken = localStorage.getItem("refreshToken");
  const removeProfile = () => {
    dispatch(deleteUserProfile({ user_id, refreshToken }));
  };
  return (
    <div id="myModal" className={active ? "modal show-popup" : "modal"}>
      <div className="modal-content">
        <span className="close" onClick={closePopup}>
          &times;
        </span>
        <div className="buttons">
          <button className="delete" onClick={removeProfile}>
            Delete
          </button>
          <button onClick={closePopup}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
