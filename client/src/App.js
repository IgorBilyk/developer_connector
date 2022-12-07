//racf short code to create component
import React, { Fragment, useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
//Components
import Navbar from "./components/layout/Navbar";
import NotFound from "./components/layout/NotFound";
import Register from "./components/register_login/Register";
import Login from "./components/register_login/Login";
import Dashboard from "./components/layout/Dashboard";
import EditProfile from "./components/layout/EditProfile";
import AddExperience from "./components/layout/AddExperience";
import AddEducation from "./components/layout/AddEducation";
import Posts from "./components/layout/Posts";
import Post from "./components/layout/post/Post";
import Profiles from "./components/Profiles/Profiles";
import { Landing } from "./components/layout/Landing";
import IndividualPost from "./components/layout/post/IndividualPost";

import "./App.css";
// contex setup
export const globalStateContext = React.createContext(
  JSON.parse(localStorage.getItem("data"))
);

function App() {
  const [userData, setUserData] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : null
  );

  const dispatch = useDispatch();

  const state = useSelector((state) => state.register);

  /* useEffect(() => {
    if (localStorage.getItem("data")) {
      setUserData(localStorage.getItem("data"));
    } else {
      setUserData(null);
    }
    console.log(userData);
  }, []); */
  /*   console.log(userData.name);
   */ return (
    <Router>
      <globalStateContext.Provider value={userData}>
        <Fragment>
          <Navbar />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route exact path="register" element={<Register />} />
            <Route
              path="login"
              element={userData?.name ? <Profiles /> : <Login />}
            />
            <Route
              path="profiles"
              element={userData?.name ? <Profiles /> : <Login />}
            />
            <Route
              path="dashboard"
              element={userData?.name ? <Dashboard /> : <Login />}
            />
            <Route
              path="editProfile"
              element={userData?.name ? <EditProfile /> : <Login />}
            />
            <Route
              path="addExperience"
              element={userData?.name ? <AddExperience /> : <Login />}
            />
            <Route
              path="addEducation"
              element={userData?.name ? <AddEducation /> : <Login />}
            />
            <Route
              exact
              path="posts"
              element={userData?.name ? <Posts /> : <Login />}
            />

            <Route
              path="post/:id"
              element={userData?.name ? <IndividualPost /> : <Login />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Fragment>
      </globalStateContext.Provider>
    </Router>
  );
}

export default App;
