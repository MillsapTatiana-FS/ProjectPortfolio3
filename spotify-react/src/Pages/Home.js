import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNav from "../Components/SideNav/sideNav";
import Favorites from "./Favorites";
import Feed from "./Feed";
import Library from "../Pages/Library/Library";
import Player from "./Player";
import Trending from "./Trending";
import Login from "./Login";

const token = new URLSearchParams(window.location.search).get("token");

function Home() {
  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      axios
        .post("http://localhost:3001/spotify/v1/auth", {
          token,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch(() => {
          //window.location ='/'
        });
    }
    return () => {
      ignore = true;
    };
  }, [token]);

  return (
    <Router>
      <div style={styles.mainBody}>
        <SideNav />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;

const styles = {
  mainBody: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f7e2fb",
    borderRadius: "30px",
    display: "flex",
  },
};
