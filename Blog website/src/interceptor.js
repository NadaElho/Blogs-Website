import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://blogs-node-ta7t.onrender.com/api/v1',
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token')

    if (accessToken) {
      if (config.headers) config.headers.jwt = accessToken
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
