import { instance, config } from "./baseUrl";


export const loadDrawerMenu = async () => {
  try {
    let res = await instance
      .get(
        "/drawermenu/f9f355714e5c5115ad4e0bc94300023c",
        config
      )
    return res;

  } catch (err) {
    return err
  }
}