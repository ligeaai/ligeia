import axios from "axios";

// const baseUrl = "http://35.193.198.82:8000"
const baseUrl = "http://localhost:8000"
const apiVersion = "/api/v1"

export const instance = axios.create({
    baseURL: `${baseUrl}${apiVersion}`
});


export const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};