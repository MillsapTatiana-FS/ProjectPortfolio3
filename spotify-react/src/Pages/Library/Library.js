import React, { useState, useEffect } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import "./Library.css";
import apiClient from "../../apiKit";
import axios from "axios";
//import { setClientToken } from "../../apiKit";



export default function Library({code}) {

  const [playlists, setPlaylists] = useState(null);
  //const [code, setCode] = useState("");

  // useEffect(() => {
  //   const code = new URLSearchParams(window.location.search).get("code");
  //   const hash = window.location.hash;
  //   window.location.hash = "";
  //   if (!code && hash) {
  //     const _code = hash.split("&")[0].split("=")[1];
  //     window.location.setItem("code", _code);
  //     setCode(_code);
  //   } else {
  //     setCode(code);
  //   }
  // }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/spotify/playlists")
    .then(function (response){  
      setPlaylists(response.data.items);
      });
    }, []);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate("/player", { state: { id: id } });
  };

  return (
    <div className="screen-container">
      
      <div className="library-body">
        {playlists?.map((playlist) => (
          <div
            className="playlist-card"
            key={playlist.id}
            onClick={() => playPlaylist(playlist.id)}
          >
            <img
              src={playlist.images[0].url}
              className="playlist-image"
              alt="Playlist-Art"
            />
            <p className="playlist-title">{playlist.name}</p>
            <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
            <div className="playlist-fade">
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
