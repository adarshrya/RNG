import axios from "axios";

export default axios.create({
    baseURL: "/api",
    headers: {
        "Content-type": "application/json"
    },
    proxy: {
        protocol: 'https',
        host: 'todosvc.onrender.com',
        port: 443,
    }
});