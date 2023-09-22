import axios from "axios";

const Instance = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})

export default Instance;