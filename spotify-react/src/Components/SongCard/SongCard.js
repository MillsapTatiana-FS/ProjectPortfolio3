import React from "react";
import AlbumImage from "./albumImage";
import AlbumInfo from "./albumInfo";

export default function SongCard({ album }) {
  return (
    <div style={styles.songCardBody}>
      <AlbumImage url={album?.images[0]?.url} />
      <AlbumInfo album={album} />
    </div>
  );
}

const styles = {
    songCardBody: {
        "width": "100%",
        "height": "62%",
        "backgroundColor": "#27354d",
        "borderRadius": "30px",
        "borderBottomRightRadius": "0px",
        "flexDirection": "column",
        "justifyContent": "center",
        "alignItems": "center",
      }
}