import React from "react";

const Comment = ({ comments, name }) => {
  const { text, date, avatar } = comments[0];
  const time = date.slice(11, 16);
  console.log(time);
  return (
    <div className="comments">
      <div className="post bg-white p-1 my-1">
        <div>
          <a href="profile.html">
            <img className="round-img" src={`http:${avatar}`} alt="" />
            <h4>{name}</h4>
          </a>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            {date.slice(0, 10)} | {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
