import { instance, config } from "../../baseApi";


export const loadDrawerMenu = async () => {
  try {
    let res = await instance
      .get(
        "/menu/details/drawerMenu",
        config
      )

    return res;

  } catch (err) {
    return err
  }
}