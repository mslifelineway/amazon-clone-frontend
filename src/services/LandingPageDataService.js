import axios from "axios";

export const GetLandingPageData = async () => {
  let response = {
    data: null,
    error: null,
    message: null,
  };
  try {
    const res = await axios.get("/data/LandingPageData.json");
    response.data = res.data;
    return response;
  } catch (e) {
    response.error = e;
    return response;
  }
};
