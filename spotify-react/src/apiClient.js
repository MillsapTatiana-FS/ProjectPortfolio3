import axios from "axios";
require('dotenv').config();

const client_id = "d6f9ca3d9254465c9820c56c43246f1e";
const redirectUri = "http://localhost:3001/spotify/v1/callback";
const authEndpoint = "https://accounts.spotify.com/authorize?";
const scopes = ["user-read-private","user-library-read", "playlist-read-private","user-read-email", "user-read-currently-playing","streaming","user-modify-playback-state", "user-top-read"];
const response_type = "code";


export const loginEndpoint = `${authEndpoint}client_id=${client_id}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=${response_type}&show_dialog=true`;

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
        config.headers.Authorization = "Bearer" + {token} ;
        return config;
    });
};

export default apiClient;