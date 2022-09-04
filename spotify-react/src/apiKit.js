import axios from "axios";

const AUTHENDPOINT = "https://accounts.spotify.com/authorize?";
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = "http://localhost:3000";
const SCOPE = [
  "user-read-private",
  "user-read-email",
  "user-library-read",
  "playlist-read-private",
];

export const loginEndpoint = `${AUTHENDPOINT}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
