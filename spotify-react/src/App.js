import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNav from "./Components/SideNav/sideNav";
import Library from "./Pages/Library/Library";
import Player from "./Pages/Player/Player";
import Login from "./Pages/Login";
import apiClient from "../spotify";
import { setClientToken } from "./apiKit";

function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return 
  !token ? <Login />
   : <Router>
      <div style={styles.mainBody}>
        <SideNav />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/player" element={<Player />} />
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
