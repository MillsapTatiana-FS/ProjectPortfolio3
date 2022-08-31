import React, { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Pages/Login";
//import axios from "axios";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const [code, setCode] = useState(null);

  useEffect(() => {
    setCode = new URLSearchParams(window.location.search).get("code");
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
  return code ? <Home /> : <Login />;
}
export default App;
