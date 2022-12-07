import React, { Fragment, useState, useEffect, useContext } from "react";
import { Route, Link, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

import { logOut } from "../../store/features/userSlice";

import { globalStateContext } from "../../App";

import "../../App.css";

import Profiles from "../Profiles/Profiles";
import Register from "../register_login/Register";
import Login from "../register_login/Login";

const Navbar = () => {
  const [userData, setUserData] = useState();
  const user = useContext(globalStateContext);

  console.log(user);
  const dispatch = useDispatch();
  const { isLoggedIn, userInfo } = useSelector((state) => state.register);
  /*  useEffect(
    () => setUserData(JSON.parse(localStorage.getItem("data"))),
    [localStorage.getItem("token")]
  ); */

  /*   console.log(window.location.href.slice(22));
   */ return (
    <Fragment>
      <nav className="navbar bg-dark">
        <div>
          <h1>
            <Link to="/">
              <i className="fas fa-code"></i> DevConnector
            </Link>
          </h1>
        </div>
        <ul className="loggedUser">
          <li>{isLoggedIn ? <Link to="posts">Posts</Link> : ""}</li>
          <li>{isLoggedIn ? <Link to="profiles">Developers</Link> : ""}</li>
          <li>{isLoggedIn ? <Link to="dashboard">Dashboard</Link> : ""}</li>
          <li> {isLoggedIn ? "|" : ""}</li>

          <li>
            {isLoggedIn && (
              <Link
                onClick={() => {
                  dispatch(logOut());
                }}
              >
                Log out <FontAwesomeIcon icon={faSignOut} />
              </Link>
            )}
          </li>

          {isLoggedIn ? <p> Hi {userData?.name}</p> : " "}
          {!isLoggedIn ? <Link to="login">Login</Link> : " "}
          {!isLoggedIn ? <Link to="register">Sign up</Link> : " "}
        </ul>
      </nav>
    </Fragment>
  );
};
export default Navbar;
