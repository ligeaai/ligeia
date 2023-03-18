import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://34.125.209.98:5984/'
});
export const userName = "COUCHDB_USER"
export const userPassword = "COUCHDB_PASSWORD"
export const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${userName}:${userPassword}`),
    },
};