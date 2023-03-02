import axios from "axios";

const api = axios.create({
    baseURL: "https://63fc94bb8ef914c5559a97d1.mockapi.io",
});

export default api;