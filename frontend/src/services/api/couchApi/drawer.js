import { instance, config } from "./baseUrl";


export const loadDrawerMenu = async () => {
  try {
    let res = await instance
      .get(
        "/drawermenu/a3e0a015661f1b35103cd012d7000134",
        config
      )
    return res;

  } catch (err) {
    return err
  }
}