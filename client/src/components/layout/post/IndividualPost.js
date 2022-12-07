import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../App.css";
import { loadingTime } from "../../../config";

import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLongArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Loading from "../Loading";

import Comments from "./Comments";

const IndividualPost = () => {
  const [post, setPost] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPost(res.data);
        setTimeout(() => setIsLoading(false), loadingTime);
      });
  }, []);

  return (
    <section className="container mt-5">
      {!isLoading ? (
        <>
          <div className="post bg-white p-1 my-1">
            <div>
              <a href={post.avatar}>
                <img className="round-img" src={post.avatar} alt="avatar" />
                <h4>{post.name}</h4>
                {id === post._id && (
                  <span className="post-date">Your post</span>
                )}
              </a>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
              <p className="post-date">
                Posted on {post.date.substring(0, 10)}
              </p>
            </div>
            <div>
              <Link to="/posts">
                <FontAwesomeIcon icon={faLongArrowLeft} />
              </Link>
            </div>
          </div>
          <Comments comments={post.comments} name={post.name} id={post._id} />
        </>
      ) : (
        <div className="loading-container">
          <Loading />
        </div>
      )}
    </section>
  );
};
export default IndividualPost;
