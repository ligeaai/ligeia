import { instance, config } from "./baseUrl";


export const loadDrawerMenu = async () => {
  try {
    let res = await instance
      .get(
        "/drawermenu/4a6dcc4d57a4927110e6ca815e000aea",
        config
      )
    return res;

  } catch (err) {
    return err
  }
}