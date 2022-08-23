import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

export default function Player() {
  const location = useLocation();
  // const [tracks, setTracks] = useState([]);
  // const [currentTrack, setCurrentTrack] = useState({});
  // const [currentIndex, setCurrentIndex] = useState(0);

  

  // useEffect(() => {
  //   setCurrentTrack(tracks[currentIndex].track);
  // },[currentIndex, tracks]);

  return (
    <div className="screen-container">
      <div className="left-player-body"></div>
      <div className="right-player-body"></div>
    </div>
  )
}