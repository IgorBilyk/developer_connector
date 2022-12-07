import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";

const Post = ({
  id,
  post_id,
  text,
  name,
  avatar,
  date,
  comments,
  likes,
  likePost,
  removePost,
}) => {
  const { _id } = JSON.parse(localStorage.getItem("data"));

  return (
    <section className="container">
      <div className="post bg-white p-1 my-1">
        <div>
          <a href={avatar}>
            <img className="round-img" src={avatar} alt="avatar" />
            <h4>{name}</h4>
            {id === _id && <span className="post-date">Your post</span>}
          </a>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">Posted on {date.substring(0, 10)}</p>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => likePost(post_id)}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>{likes.length}</span>
          </button>
        </div>
        <div>
          <Link to={`/post/${post_id}`} className="btn btn-primary">
            Discussion <span className="comment-count">{comments.length}</span>
          </Link>

          {id === _id ? (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removePost(post_id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      {/*   <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div className="comments">
        <div className="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                className="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p className="my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus! Minus nesciunt soluta
              suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
              dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
            <p className="post-date">Posted on 04/16/2019</p>
          </div>
        </div>

        <div className="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                className="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p className="my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus! Minus nesciunt soluta
              suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
              dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
            <p className="post-date">Posted on 04/16/2019</p>
            <button type="button" className="btn btn-danger">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>  */}
    </section>
  );
};
export default Post;
