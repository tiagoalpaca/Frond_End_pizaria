import axios from 'axios';

// faz uma instancia do axios
const api = axios.create({
    baseURL: 'http://localhost:3001'
})

export default api;