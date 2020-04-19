import React, { Component } from "react";
//import { list } from "./apiPost";
import DefaultPost from "../images/mountains.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

   loadPosts = async () => {
    // let data = await (await fetch("/api/posts")).json();
    // this.setState({ posts: data });
    try {
      const res = await axios.get("/api/posts");
      // .then((resdata) => {return resdata.data})
      // this.setState({ posts: res });
      const data = await res.data;
      this.setState({ posts: data });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.loadPosts();
  }

  renderPosts = posts => {
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
            <div className="card col-md-4" key={i}>
              <div className="card-body">
                <img
                  //${process.env.REACT_APP_API_URL}
                  src={`/api/post/photo/${post._id}`}
                  alt={post.title}
                  onError={i =>
                    (i.target.src = `${DefaultPost}`)
                  }
                  className="img-thunbnail mb-3"
                  style={{ height: "200px", width: "100%" }}
                />
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                  {post.body.substring(0, 100)}
                </p>
                <br />
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

  render() {
    const { posts } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">
          {!posts.length ? "No more posts!" : "Recent Posts"}
        </h2>

        {this.renderPosts(posts)}

      </div>
    );
  }
}

export default Posts;
