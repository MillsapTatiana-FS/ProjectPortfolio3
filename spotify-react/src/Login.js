import React from 'react';

// SPOTIFY API AUTH URL
const client_id = process.env.CLIENT_ID
const redirect_uri = 'http://localhost:3000/callback'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

function Login() {
    return (
        <div style={styles.loginPage}>
                <img 
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
            alt="logo-spotify"
            className="logo" 
            />
                <a href={AUTH_URL}>
                    <div className="login-btn">Login with Spotify</div>
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
        width: '30%',
      },
      
      loginBtn: {
        width: '200px',
        padding: '15px 0px',
        textAlign: 'center',
        backgroundColor: '#bd09c0',
        borderRadius: '50px',
        color: '#1f1f1f',
        fontWeight: '600',
        marginTop: '20%',
      },
      
      a: {
        textDecoration: 'none',
      }
    }