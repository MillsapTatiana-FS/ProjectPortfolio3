import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNav from "./Components/SideNav/sideNav";
import Login from "./Pages/Login";
import Library from "./Pages/Library/Library";
import Player from "./Pages/Player/Player";
import { setClientToken } from "./apiKit";

function Home() {
  const [data, setData] = useState({});
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/spotify/v1/me")
      .then(({ data }) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return !token ? (
    <Login />
  ) : (
    <Router>
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
