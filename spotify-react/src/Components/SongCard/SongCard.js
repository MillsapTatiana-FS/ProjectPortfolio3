import React from "react";
import AlbumImage from "./albumImage";
import AlbumInfo from "./albumInfo";

export default function SongCard({ album }) {
  return (
    <div className="songCard-body flex">
      <AlbumImage url={album?.images[0]?.url} />
      <AlbumInfo album={album} />
    </div>
  );
}

const styles = {
    .songCard-body {
        width: 100%;
        height: 62%;
        background-color: #27354d;
        border-radius: 30px;
        border-bottom-right-radius: 0px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
}