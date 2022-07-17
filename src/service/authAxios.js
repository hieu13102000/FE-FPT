import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
export function authAxios(options) {
  const { headers } = options;

  return axios.create({
    baseURL: backendUrl,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}
