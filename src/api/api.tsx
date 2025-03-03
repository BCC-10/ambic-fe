import axios from "axios"

const api = axios.create({
    baseURL: "https://ambic.live:443/api/v1",
    headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
    },
    timeout: 5000,
})

export default api;