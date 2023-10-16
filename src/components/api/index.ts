import axios from "axios";

let api 
let token

if (typeof window !== 'undefined') {
    // Perform localStorage action
  token = localStorage.getItem('token')
  }

  const protocol = process.env.PROTOCOL || 'http'
  const host = process.env.HOST || "localhost"
  const port = process.env.PORT || '3000'

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default  api = axios.create({
        //baseURL: import.meta.env.VITE_URL,
        baseURL: protocol+"://"+host+":"+port
      });
