import React, { useState, useEffect } from "react";
//import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNav from "./Components/SideNav/sideNav";
import Login from "./Pages/Login";
import Favorites from "./Pages/Favorites";
import Feed from "./Pages/Feed";
import Library from "./Pages/Library/Library";
import Player from "./Pages/Player";
import Trending from "./Pages/Trending";

function Home() {
  const [code, setCode] = useState("");

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!code && hash) {
      const _code = hash.split("&")[0].split("=")[1];
      window.location.setItem("code", _code);
      setCode(_code);
    } else {
      setCode(code);
    }
  }, []);
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
