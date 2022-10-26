import { instance, config } from "./baseUrl";


export const loadDrawerMenu = async () => {
  try {
    let res = await instance
      .get(
        "/drawermenu/8d9fb35ab3dc4aa2ff9392eb4b0001c6",
        config
      )
    return res;

  } catch (err) {
    return err
  }
}