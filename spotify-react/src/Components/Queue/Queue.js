import React from 'react';
import "./Queue.css";

export default function Queue({ tracks, setCurrentIndex }) {
  return (
    <div className="queue-container flex">
        <div className="queue flex">
            <p className="upNext">Up Next</p>
            <div className="queue-list">
                {tracks.map((track, index) =>(
                    <div
                    key={index + "key"}
                    className="queue-item flex"
                    onClick={() => setCurrentIndex(index)}
                    >
                        <p className="track-name">{track.track.name}</p>
                        <p>0:30</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

const styles = {
    .queue-container {
        width: 100%;
        height: 35%;
        border-radius: 30px;
        border-top-right-radius: 0px;
        background-color: #3e61d2;
        opacity: 1;
        background-image: repeating-radial-gradient(
            circle at 0 0,
            transparent 0,
            #3e61d2 40px
        ),
        repeating-linear-gradient(#4767d055, #4767d0);
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .queue {
        height: 85%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .upNext {
        font-size: 20px;
        font-weight: 700;
        color: #fff;
        text-align: left;
        margin: 10px 0px;
    }
    
    .queue-list {
        height: 80%;
        width: 100%;
        overflow-y: auto;
    }
    
    .queue-list::-webkit-scrollbar {
        display: none;
    }
    
    .queue-item {
        justify-content: space-between;
        width: 100%;
        padding: 5px 0px;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }
    
    .queue-item:hover {
        transform: scale(0.95);
    }
    
    .queue-item p {
        margin: 0px;
    }
    
    .track-name {
        width: 75%;
        text-overflow: ellipsis;
    }
}