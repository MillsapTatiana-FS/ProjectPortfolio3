import React, { useState, useEffect } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import axios from "axios";

function App() {
  const code = new URLSearchParams(window.location.search).get('code')
  return (
    <div>
      
        {code 
          ? <Home code={code} /> 
          : <Login />
        }
     
    </div>
  );
}
export default App;
