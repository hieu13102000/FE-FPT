import axios from "axios";
import { authAxios } from "./authAxios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;
export async function getDataByPathTest(path, accessToken, data) {
  try {
    let endpoint = "";
    let option = {};
    if (accessToken && accessToken !== "") option = getOptions(accessToken);
    if (path !== "") {
      endpoint = `/${path}`;
    }
    if (data !== "") {
      endpoint = `/${path}?${data}`;
    }
    const res = await authAxios(option).get(endpoint);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function searchDataByPath(path, accessToken, data) {
  try {
    let endpoint = "";
    let body = {};
    let option = {};
    if (accessToken && accessToken !== "") option = getOptions(accessToken);
    if (path !== "") {
      endpoint = `/${path}/${data}`;
    }
    if (data !== "") {
      body = data;
    }
    const res = await authAxios(option).get(endpoint, body);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function loginDataByPath(path, data) {
  try {
    let endpoint = "";
    let body = {};
    if (path !== "") {
      endpoint = `${backendUrl}/${path}`;
    }
    if (data !== "") {
      body = data;
    }
    const res = await axios.post(endpoint, body);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function createDataByPath(path, accessToken, data) {
  try {
    let endpoint = "";
    let body = {};
    let option = {};
    if (accessToken && accessToken !== "") option = getOptions(accessToken);
    if (path !== "") {
      endpoint = `/${path}`;
    }
    if (data !== "") {
      body = data;
    }
    const res = await authAxios(option).post(endpoint, body);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function updateDataByPath(path, accessToken, data) {
  try {
    let endpoint = "";
    let body = {};
    let option = {};
    if (accessToken && accessToken !== "") option = getOptions(accessToken);
    if (path !== "") {
      endpoint = `/${path}`;
    }
    if (data !== "") {
      body = data;
    }
    const res = await authAxios(option).put(endpoint, body);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function deleteDataByPath(path, accessToken, id) {
  try {
    let endpoint = "";
    let option = {};
    if (accessToken && accessToken !== "") option = getOptions(accessToken);
    if (path !== "") {
      endpoint = `/${path}/${id}`;
    }
    const res = await authAxios(option).delete(endpoint);
    return res;
  } catch (error) {
    return error.response;
  }
}
function getOptions(accessToken) {
  let headers = {};

  if (accessToken && accessToken !== "") {
    headers = {
      Authorization: `bearer ${accessToken}`,
    };
  }
  const options = { headers };
  return options;
}
