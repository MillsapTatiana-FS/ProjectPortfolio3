import React from "react";
import { loginEndpoint } from "../apiKit";

export default function Login() {
  return (
    <div style={styles.loginPage}>
      <img style={styles.logo}
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
        alt="logo-spotify"
      />
      <a href={loginEndpoint}>
        <div style={styles.loginBtn}>Login With Spotify</div>
      </a>
    </div>
  )
}
const styles = {
    loginPage: {
        backgroundColor: "#000000",
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexDirection: 'column',
      },
      
      logo: {
        width: '950px',
        marginTop: '12%',
        height: '35vh',
      },
      
      loginBtn: {
        width: '400px',
        padding: '15px 0px',
        textAlign: 'center',
        fontSize: '22px',
        backgroundColor: '#bd09c0',
        borderRadius: '40px',
        borderColor: '#c457c6',
        color: '#d5d3d3',
        fontWeight: '600',
        marginTop: '20%',
      },
      
      a: {
         textDecoration: 'none',
      }
    }