// import { instance, config } from "../../baseApi";
// export const loadDrawerMenu = async () => {
//   try {
//     let res = await instance
//       .get(
//         "/menu/details/drawerMenu",
//         config
//       )

//     return res;

//   } catch (err) {
//     return err
//   }
// }

import axios from "axios";

export const instance = axios.create({
  baseURL: 'http://localhost:5984'
});
export const userName = "COUCHDB_USER"
export const userPassword = "COUCHDB_PASSWORD"
export const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + btoa(`${userName}:${userPassword}`),
  },
};

export const loadDrawerMenu = async () => {
  try {
    let res = await instance
      .get(
        "/drawermenu/f5d31d4d993e2e4a5498a0d7aa000cf9",
        config
      )
    console.log(res);
    return res;

  } catch (err) {
    return err
  }
}