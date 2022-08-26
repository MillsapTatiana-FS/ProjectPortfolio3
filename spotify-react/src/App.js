import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

const token = new URLSearchParams(window.location.search).get("token");

function App(token) {
  // let ignore = false;
  useEffect(() => {
    if (!token) {
      axios.get("http://localhost:3001/spotify/v1/auth",
       {token,})
        .then((res) => {
          console.log(res.data);
        })
        .catch(() => {
          window.location = "/";
        });
    }
  }, [code]);

  return (
    <div>
      {code ? <Home code={code} /> : <Login />}
    </div>
    );
  
}
export default App;
