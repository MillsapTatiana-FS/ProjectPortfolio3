import React from 'react';


const {CLIENT_ID, CLIENT_SECRET} = process.env
const REDIRECT_URI = 'http://localhost:3000/callback'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

function Login() {
    return (
        <div style={styles.loginPage}>
            <img 
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
            alt="logo-spotify"
            style={styles.logo} 
            />
                <a href={AUTH_URL}>
                    <div style={styles.loginBtn}>Login with Spotify</div>
                </a>
        </div>
    );
}


export default Login;

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
      
      logo: {
        width: '900px',
        height: '40vh',
      },
      
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
      
      a: {
        textDecoration: 'none',
      }
    }