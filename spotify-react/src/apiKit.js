import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = process.env.CLIENT_ID;
const redirectUri = "http://localhost:3001/spotify/v1/auth";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    config.headers.ContentType = "application/json";
    return config;
  });
};

export default apiClient;
