import { instance, config } from "./baseUrl";


export const loadDrawerMenu = () => {
  try {
    let res = instance
      .get(
        "/drawermenu/1eb0b88415ca3c4a55a25b464200046c",
        config
      )
    return res;

  } catch (err) {
    console.log(err);
  }
}