import axios from "axios";

export default axios.create({
    baseURL: 'https://contact-manager-api-k6r8.onrender.com'
   // baseURL: 'https://serene-peak-42468.herokuapp.com'
})