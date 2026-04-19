import axios from "axios";
const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL || 'http://localhost:5000',
    timeout:100000,
    headers:{
        "Content-Type":"application/json",
    }
})

api.interceptors.request.use(
    (config)=>{
        // use the same key as AuthContext and socket (`authToken`)
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        // avoid noisy logs in production
        // console.debug('api request headers', config.headers)
        return config

    },
    (error)=>{
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response)=>{
     return response;
    },
    (error)=>{
        if(error.response?.status===401){
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href="/login";
        }
        return Promise.reject(error)

    }
)

export default api;