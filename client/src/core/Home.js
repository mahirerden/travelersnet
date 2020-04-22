import React, { useState, useEffect } from 'react';
import Posts from "../post/Posts";
import Pagination from "../post/Pagination";
import Background from "../images/kapadokya.jpg"
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  useEffect(() => {
    setLoading(true);
    loadPosts();
    setLoading(false);
  }, []);

  const loadPosts = async () => {
    // let data = await (await fetch("/api/posts")).json();
    // this.setState({ posts: data });
    try {
      const res = await axios.get("/api/posts");
      // .then((resdata) => {return resdata.data})
      // this.setState({ posts: res });
      //const data = await res.data;
      setPosts(res.data);
      //this.setState({ posts: data });
    } catch (error) {
      console.log(error);
    }
  }

   // Get current posts
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
 
   // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);

  return(
  <div>
    <div style={{ marginTop: "60px" }}>
    <div className="jumbotron" style={{ height: "500px", backgroundImage: `url(${Background})`, backgroundSize: "cover" }}>
      <h1 style={{ color: "orange", textAlign: "center", fontSize: "70px", marginTop: "300px"  }}>Share your travel memories...</h1>
    </div>
    <div className="container">
      <Posts posts={currentPosts} loading={loading} />
    </div> 
    <br/>
    <div>
      <Pagination 
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
    </div>
  </div>
  )
};

export default Home;
