import React, { useState, useEffect } from 'react';
import apiClient from '../../spotify';
import { useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';

export default function Library() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    apiClient.get("me/playlists").then(function (res) {
      setPlaylists(res.data.items);
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
          <div className="playlist-card"
            key={playlist.id}
            onClick={() => playPlaylist(playlist.id)}
          >
            <img
              src={playlist.id}
              className="playlist-image"
              alt="Playlist-Art"
            />
            <p className="playlist-title">{playlist.name}</p>
            <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
            <div className="playlist-fade">
              <IconContext.Provider value={{ size: "50px", color: "#ffffff" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
    libraryBody: {
        width: '94%',
        height: '90%',
        padding: '3%',
        display: 'flex',
        flexWrap: 'wrap',
        overflowY: 'auto',
        justifyContent: 'space-between',
      },
      
      playlistCard: {
        position: 'relative',
        width: '15%',
        height: '35%',
        borderRadius: '20px',
        backgroundColor: 'rgb(236, 56, 221)',
        border: '1px solid rgba(250, 250, 251, 0.697)',
        padding: '1%',
        marginBottom: '2%',
        background:' rgb(1, 2, 3)',
        background: 
        'linear-gradient(
            '75deg':
         ' rgb(250, 250, 249) 0%':
         ' rgba(245, 215, 236, 0) 100%'
        )',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      },
      
      playlistCard:hover : {
        transform: scale(1.02);
      },
      
      playlistCard:hover, playlistFade: {
        opacity: '0',
      },
      
      playlistImage: {
        width: '100%',
        aspectRatio: '1',
        borderRadius: '20px',
      },
      
      playlistTitle: {
        fontWeight: 'bold',
        fontSize: '16px',
        color: '#a007ae',
        margin: '10px 0 10px',
        display: 'webkitBox',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        webKitLineClamp: '2',
        lineClamp: '2',
        webkitBoxOrient: "vertical",
      },
      
      playlistSubtitle: {
        fontWeight: "400",
        fontSize: "12px",
        margin: "0px",
        color: "#e85fdfcf",
      },
      
      playlistFade: {
        position: "absolute",
        right: "0",
        bottom: "0",
        opacity: "0",
        width: "84%",
        height: "34%",
        borderRadius: "20px",
        background: linear-gradient(
          180deg,
          rgba(175, 142, 192, 0.345) 10%,
          rgb(150, 60, 150) 100%
        ),
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: "8%",
        transition: "0.5s ease",
      }
}