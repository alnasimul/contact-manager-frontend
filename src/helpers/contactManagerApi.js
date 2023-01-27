import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:4000'
   // baseURL: 'https://serene-peak-42468.herokuapp.com'
})