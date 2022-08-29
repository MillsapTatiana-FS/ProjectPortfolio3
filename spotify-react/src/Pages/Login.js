import React from "react";
require("dotenv").config();

// const client_id = process.env.CLIENT_ID;
// const redirectUri = "http://localhost:3000/callback";
// const authEndpoint = "https://accounts.spotify.com/authorize?";
// const scopes = [
//   "user-read-private",
//   "user-library-read",
//   "playlist-read-private",
//   "user-read-email",
//   "user-read-currently-playing",
//   "streaming",
//   "user-modify-playback-state",
//   "user-top-read",
// ];
// const response_type = "code";

// const loginEndpoint = `${authEndpoint}client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scopes.join(
//   "%20"
// )}&response_type=${response_type}&show_dialog=true`;
// console.log(client_id);

export default function Login() {
  return (
    <div style={styles.loginPage}>
      <img
        style={styles.logo}
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="logo-spotify"
      />
      <a href="http://localhost:3001/spotify/v1/login">
        <div style={styles.loginBtn}>Login With Spotify</div>
      </a>
    </div>
  );
}
const styles = {
  loginPage: {
    backgroundColor: "#000000",
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexDirection: "column",
  },

  logo: {
    width: "900px",
    height: "35vh",
  },

  loginBtn: {
    width: "400px",
    padding: "15px 0px",
    textAlign: "center",
    fontSize: "22px",
    backgroundColor: "#bd09c0",
    borderRadius: "40px",
    borderColor: "#c457c6",
    color: "#d5d3d3",
    fontWeight: "600",
    marginTop: "20%",
  },

  a: {
    textDecoration: "none",
  },
};
