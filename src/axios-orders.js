import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://sand-builder.firebaseio.com/'
});

export default instance;