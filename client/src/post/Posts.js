import React from "react";
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  const renderPosts = posts => {
    return (
      <div className="row">
        {posts.map((post, i) => {
          const posterId = post.postedBy
            ? `/user/${post.postedBy._id}`
            : "";
          const posterName = post.postedBy
            ? post.postedBy.name
            : " Unknown";

          return (
            <div className="media p-4 m-3 border border-success rounded-left" key={i}>
              <img
                //${process.env.REACT_APP_API_URL}
                src={`/api/post/photo/${post._id}`}
                alt={post.title}
                onError={i =>
                  (i.target.src = `${DefaultPost}`)
                }
                className="img-thunbnail"
                style={{ height: "250px", width: "300px" }}
              />
              <div className="media-body ml-3">
                <h3>{post.title}</h3>
                <p>
                  {post.body.substring(0, 400) + " ..."}
                </p>
                <p className="font-italic mark">
                  Posted by{" "}
                  <Link to={`${posterId}`}>
                    {posterName}{" "}
                  </Link>
                  on {new Date(post.created).toDateString()}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="btn btn-raised btn-primary btn-sm">
                  Read more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container">
      <h2 className="mt-3">
        {!posts.length ? "No posts created!" : "Recent Posts"}
      </h2>

      {renderPosts(posts)}

    </div>
  );

}

export default Posts;
