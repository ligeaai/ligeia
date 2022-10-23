import { instance, config } from "./baseUrl";


export const loadDrawerMenu = async () => {
  try {
    let res = await instance
      .get(
        "/drawermenu/f2bbd6f29ce38f1a08c0d6c9ff000f45",
        config
      )
    return res;

  } catch (err) {
    return err
  }
}