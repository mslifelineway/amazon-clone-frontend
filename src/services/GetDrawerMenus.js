import axios from "axios";

export const GetDrawerMenus = async () => {
  let response = {
    data: null,
    error: null,
    message: null,
  };
  try {
    const res = await axios.get("/data/DrawerMenuData.json");
    response.data = res.data;
    return response;
  } catch (e) {
    response.error = e;
    return response;
  }
};
