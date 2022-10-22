import { instance, config } from "./baseUrl";


export const loadDrawerMenu = async () => {
  try {
    let res = await instance
      .get(
        "/drawermenu/174bef3d5b000c9b243a2c35cd000b84",
        config
      )
    return res;

  } catch (err) {
    return err
  }
}