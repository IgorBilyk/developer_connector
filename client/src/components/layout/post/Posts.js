import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading";

import { loadingTime } from "../../../config";

import Post from "./Post";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [clicks, setClicks] = useState(true);
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    //Get all Posts
    (async () => {
      axios
        .get("http://localhost:5000/posts", {
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${refreshToken}`,
          },
        })
        .then((res) => {
          setPosts(res.data);
          setTimeout(() => setIsLoading(false), loadingTime);
        });
    })();
  }, [clicks]);
  //Like/unlike post
  const likePost = async (id) => {
    await fetch(`http://localhost:5000/likes/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    setClicks((prev) => (prev = !prev));
  };
  // Remove Post
  const removePost = async (id) => {
    try {
      const result = await fetch(`http://localhost:5000/post/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }).then((res) => {
        if (!res.ok) {
          console.log("Error");
        }
        setClicks((prev) => !prev);
        console.log(result);
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleInput = (e) => {
    if (!e.target.value.trim()) return false;
    setPost(e.target.value);
    console.log(post);
  };
  const config = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      "Content-Type": "application/json",
    },
  };
  //Submit Post
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/posts`, { text: post }, config);
      setClicks((prev) => !prev);
      setPost("");
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handlePost(e);
    }
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>

      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={handlePost}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={post}
            onChange={handleInput}
            onKeyDown={handleKeypress}
            style={{ overflow: "auto", resize: "none" }}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      {!isLoading ? (
        posts.map((post) => (
          <Post
            key={post._id}
            id={post.user}
            post_id={post._id}
            text={post.text}
            name={post.name}
            avatar={post.avatar}
            date={post.date}
            comments={post.comments}
            likes={post.likes}
            likePost={likePost}
            removePost={removePost}
          />
        ))
      ) : (
        <div className="loading-container">
          <Loading />
        </div>
      )}
    </section>
  );
};
export default Posts;
