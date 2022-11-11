import { instance, config } from "../../baseApi";
export const loadDrawerMenu = async () => {
  try {
    let res = await instance
      .get(
        "/resource-list/menu/",
        config
      )
    console.log(res);
    return res;

  } catch (err) {
    return err
  }
}