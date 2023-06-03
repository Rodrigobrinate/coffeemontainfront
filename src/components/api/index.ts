import axios from "axios";

let api 
let token

if (typeof window !== 'undefined') {
    // Perform localStorage action
  token = localStorage.getItem('token')
  }

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default  api = axios.create({
        //baseURL: import.meta.env.VITE_URL,
        baseURL: "http://187.94.219.205:3000"
      });
