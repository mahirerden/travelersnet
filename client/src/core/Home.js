import React from "react";
import Posts from "../post/Posts";
import Background from "../images/kapadokya.jpg"

const Home = () => (
  <div>
    <div style={{ marginTop: "70px" }}>
    <div className="jumbotron" style={{ height: "500px", backgroundImage: `url(${Background})`, backgroundSize: "cover" }}>
      <h1 style={{ color: "orange", textAlign: "center", fontSize: "70px", marginTop: "250px"  }}>Share your travel memories...</h1>
    </div>
    <div className="container">
      <Posts />
      <br/>
    </div>
    </div>
  </div>
);

export default Home;
