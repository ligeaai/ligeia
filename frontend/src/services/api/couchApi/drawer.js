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
  baseURL: 'http://34.125.207.225:5984'
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
        "/drawermenu/37b4548ead342d11d63531c74b000b93",
        config
      )
    console.log(res);
    return res;

  } catch (err) {
    return err
  }
}