import React, { useState, useEffect } from 'react';
import "./AudioPlayer.css";
import Controls from "./controls";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";

export default function AudioPlayer({
    currentTrack,
    currentIndex,
    setCurrentIndex,
    total,
}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const audioSrc = total[currentIndex].track.preview_url;

    const audioRef = useRef(new Audio(total[0].track.preview_url));

    const intervalRef = useRef();

    const isReady = useRef(false);

    const { duration } = audioRef.current;

    const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

    const startTimer = () => {
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                handleNext();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        } , 1000);
    };

    useEffect(() => {
        if (audioRef.current.src){
            if (isPlaying) {
                audioRef.current.play();
                startTimer();
            } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
            }
        } else {
            if (isPlaying){
                audioRef.current = new Audio(audioSrc);
                audioRef.current.play();
                startTimer();
            } else {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
        }
    } , [isPlaying]);

    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(audioSrc);

        setTrackProgress(audioRef.current.currentTime);

        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        } else {
            isReady.current = true;
        }
    }, []);

    const handleNext = () => {
        if (currentIndex < total.length -1) {
            setCurrentIndex(currentIndex + 1);
        } else  setCurrentIndex(0);
    };

    const handlePrev = () => {
        if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
         else setCurrentIndex(currentIndex - 1);
        };

        const addZero = (n) => {
            return n > 9 ? "" + n : "0" + n;
        };
        const artists = [];
        currentTrack.album.artists.forEach((artist) => {
            artists.push(artist.name);
        });
  return (
    <div className="player-body flex">
        <div className="player-left-body">
            <ProgressCircle
                percentage={currentPercentage}
                isPlaying={true}
                image={currentTrack.album.images[0].url}
                size={300}
                color="#C96850" 
                />
        </div>
        <div className="player-right-body-flex">
            <p className="song-title">{currentTrack.name}</p>
            <p className="song-artist">{artists.join(" | ")}</p>
            <div className="player-right-bottom-flex">
                <div className="song-duration flex">
                    <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
                    <WaveAnimation isPlaying={isPlaying} />
                    <p className="duration">0:30</p>
                </div>
            <Controls
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                handleNext={handleNext}
                handlePrev={handlePrev}
                total={total} 
                />
            </div>
        </div>
    </div>
  );
}

const styles = {
    .player-body {
        width: 100%;
        height: 40%;
        margin: 3% 0%;
      }
      
      .player-left-body {
        width: 37%;
      }
      
      .player-right-body {
        width: 63%;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
      
      .song-title {
        text-align: center;
        font-size: 58px;
        font-weight: bold;
        margin: 0px;
        color: #c4d0e3;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      
      .song-artist {
        color: #9aa9c2;
        font-size: 14px;
        font-weight: 500;
      }
      
      .player-right-bottom {
        align-items: center;
        width: 100%;
        flex-direction: column;
      }
      
      .song-duration {
        width: 50%;
        justify-content: space-between;
        margin-bottom: 20px;
        align-items: center;
      }
      
      .duration {
        font-size: 20px;
        font-weight: 700;
        margin: 0;
        color: #c4d0e3;
      }
}