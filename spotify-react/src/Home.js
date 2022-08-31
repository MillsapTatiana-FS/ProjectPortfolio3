import React, { useState, useEffect } from "react";
//import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNav from "./Components/SideNav/sideNav";
import Login from "./Pages/Login";
import Library from "./Pages/Library/Library";
import Player from "./Pages/Player/Player";
import axios from "axios";

function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:3001/spotify/v1/me')
    .then(({data}) => {
      console.log(data);
      setData(data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  return (
    
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
