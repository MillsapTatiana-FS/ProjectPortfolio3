import React, {useState, useEffect} from "react";



export default function Login() {
  return (
    <div
      style={styles.loginPage}
    >
      <a style={styles.loginBtn} href="http://localhost:3001/spotify/v1/login">
        Login With Spotify
      </a>
    </div>
  )
}
const styles = {
    loginPage: {
        backgroundColor: "#000000",
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexDirection: 'column',
      },
      
//       logo: {
//         width: '900px',
//         height: '40vh',
//       },
      
      loginBtn: {
        width: '400px',
        padding: '15px 0px',
        textAlign: 'center',
        fontSize: '24px',
        backgroundColor: '#bd09c0',
        borderRadius: '50px',
        borderColor: '#bd09c0',
        color: '#f5f0f0',
        fontWeight: '600',
        marginTop: '20%',
      },
      
//       a: {
//         textDecoration: 'none',
//       }
    }