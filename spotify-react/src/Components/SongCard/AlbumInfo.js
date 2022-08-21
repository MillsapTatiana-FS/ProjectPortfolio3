import React from 'react';
import "./AlbumInfo.css";

export default function AlbumInfo({ album }) {
  const artists = [];
  album.artists.forEach((element) => {
    artists.push(element.name);
  });

    return (
    <div className="albumInfo-card">
        <div className="albumName-container">
            <div className="marquee">
                <p>{album.name + "-" + artists.join("-")}
                </p>
            </div>
        </div>
        <div className="album-info">
            <p>{`${album.name} is an ${album.album_type} by ${artists.join(",")} with ${album.total_tracks} track(s)`}</p>
        </div>
        <div className="album-release">
            <p>Release Date: {album.release_date}</p>
        </div>
    </div>
  );
}

const styles = {
    .albumInfo-card{
        margin-top: 20px;
        width: 80%;
    }
    
    .albumInfo-card p {
        margin: 5px auto !important;
    }
    
    .albumName-container {
        width: 100%;
        overflow: hidden;
        font-size: 20px;
        font-weight: 700;
        color: #c3d0e3;
    }
    
    .marquee {
        white-space: nowrap;
        display: inline-block;
        animation: marquee 12s linear infinite;
        padding-left: 100%;
    }
    
    @keyframes marquee {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(-100%, 0);
        }
    }
    
    .album-info {
        font-size: 14px;
        font-weight: 500;
        color: #9aa9c2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    
    .album-release {
        font-size: 12px;
        font-weight: 400;
        color: #9aa9c2;
        margin: top 10px;
    }
}