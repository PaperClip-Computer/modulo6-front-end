import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://host.docker.internal:3333/api/v1',
});

export default axiosInstance;
