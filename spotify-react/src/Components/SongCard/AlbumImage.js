import React from 'react'

export default function AlbumImage({ url }) {
  return (
    <div className="albumImage flex">
        <img src={url} alt="album art" className="albumImage-art" />
        <div className="albumImage-shadow">
            <img src={url} alt="shadow" className="albumImage-shadow" />
        </div>
    </div>
  );
}

const styles = {
    .albumImage{
        width: 80%;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
    }
    
    .albumImage img{
        border-radius: 30px;
        width: 100%;
        aspect-ratio: 1;
    }
    
    .albumImage-shadow{
        -webkit-filter: blur(10px);
        filter: blur(10px);
        width: 90%;
        position: absolute;
        z-index: -1;
        top: 20px;
    }
}