import React from "react";
import AlbumImage from "./AlbumImage";
import AlbumInfo from "./AlbumInfo";

export default function SongCard({ album }) {
  return (
    <div className="flex" style={styles.songCardBody}>
      <AlbumImage url={album?.images[0]?.url} />
      <AlbumInfo album={album} />
    </div>
  );
}

const styles = {
  songCardBody: {
    width: "95%",
    height: "55%",
    marginLeft: "2%",
    marginRight: "10%",
    backgroundColor: " #ad2ba0",
    borderRadius: "30px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};
