import axios from "axios";

let api 
let token

if (typeof window !== 'undefined') {
    // Perform localStorage action
  token = localStorage.getItem('token')
  }

  const protocol = process.env.PROTOCOL
  const host = process.env.HOST
  const port = process.env.PORT

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default  api = axios.create({
        //baseURL: import.meta.env.VITE_URL,
        baseURL: protocol+"://"+host+":"+port
      });
