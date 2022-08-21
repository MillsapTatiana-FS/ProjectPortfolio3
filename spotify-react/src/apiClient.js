import axios from "axios";
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize?";
const scopes = ["user-read-private","user-library-read", "playlist-read-private","user-read-email", "user-read-currently-playing","streaming","user-modify-playback-state", "user-top-read"];
const RESPONSE_TYPE = "code";


export const loginEndpoint = `${AUTH_ENDPOINT}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join("%20")}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
};

export default apiClient;