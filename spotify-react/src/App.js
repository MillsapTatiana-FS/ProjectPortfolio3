import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    axios
      .get("/")
      .then((response) => {
        setBackendData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Login />
    </div>
  );
}
export default App;
