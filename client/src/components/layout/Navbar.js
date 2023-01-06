import React, { Fragment} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";

import { useSelector, useDispatch } from "react-redux";

import { logOut } from "../../store/features/userSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const stateData = useSelector((state) => state.register);
  const { isLoggedIn } = stateData;
  const userData = isLoggedIn ? JSON.parse(localStorage.getItem("data")) : null;
  const test = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const result = await axios.post(
      "http://localhost:5000/test",
      {},
      {
        "Content-Type": "application/json",

        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    localStorage.setItem("accessToken", result.data.accessToken);
    return result.data;
  };
  return (
    <Fragment>
      {isLoggedIn ? (
        <nav className="navbar bg-dark">
          <button onClick={test}>JWT</button>
          <div>
            <h1>
              <Link to="/">
                <i className="fas fa-code"></i> DevConnector
              </Link>
            </h1>
          </div>
          <ul className="loggedUser">
            <li>
              <Link to="posts">Posts</Link>
            </li>
            <li>
              <Link to="profiles">Developers</Link>
            </li>
            <li>
              <Link to="dashboard">Dashboard</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link to="dashboard">Hey {userData?.name}</Link>
              </li>
            ) : (
              ""
            )}

            <li> | </li>
            <li>
              <Link
                onClick={() => {
                  dispatch(logOut());
                  window.location("/");
                }}
              >
                Log out <FontAwesomeIcon icon={faSignOut} />
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navbar bg-dark">
          <ul>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="register">Sign up</Link>
            </li>
          </ul>
        </nav>
      )}
    </Fragment>
  );
};
export default Navbar;
