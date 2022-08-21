import React, {useState, useEffect} from "react";
import axios from "axios"

function Home({code}) {
  const [info, setInfo] = useState(null)
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  const [error, setError] = useState(null)


  let ignore = false;
  useEffect(()=>{
    if(!ignore){
        axios.post('http://localhost:3001/spotify/v1/auth', {
        code
        }).then(res =>{
            console.log(res.data)
        }).catch(()=>{
            window.location ='/'
        })
    }
    return()=>{
    ignore = true;
    }
    
  }, [code])

  
  return (
    <div className="App">
        <header className="App-header">
            <h1>Dashboard</h1>
        </header>
    </div>
  );
}

export default Home;