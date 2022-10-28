import { instance, config } from "./baseUrl";


export const loadDrawerMenu = async () => {
  try {
    let res = await instance
      .get(
        "/drawermenu/421d561488633d5d467f77f34500069f",
        config
      )
    return res;

  } catch (err) {
    return err
  }
}