"use client";

import axios from "axios";
// import Cookies from "js-cookie";

const postAsync = async (url: string, requestBody: any) => {
  // const encryptedBody = _wrap(requestBody);
  // let appHeaders = {
  //   "Content-Type": "application/json; charset=utf-8",
  //   token: Cookies.get("authToken") ?? "",
  //   companyid: Cookies.get("companyId") ?? 1,
  // };

  //  console.log("----------- This is my Headers Value look. ----------------",appHeaders)
  //  console.log("----------- This is my url Value look. ----------------",url)

  return axios
    .post(
      url,
      requestBody
      // { headers: appHeaders }
    )
    .then((response: any) => {
      // console.log(`POST ${url}`);

      // console.log("received from server ", response.status);

      return response.data;
    });
};

const putAsync = async (url: string, requestBody: any) => {
  // const encryptedBody = _wrap(requestBody);
  let appHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    // token: Cookies.get("authToken") ?? "",
    // companyid: Cookies.get("companyId") ?? 1,
  };

  //  console.log("----------- This is my Headers Value look. ----------------",appHeaders)
  //  console.log("----------- This is my url Value look. ----------------",url)

  return axios
    .put(url, requestBody, { headers: appHeaders })
    .then((response: any) => {
      // console.log(`POST ${url}`);

      // console.log("received from server ", response.status);

      return response.data;
    });
};

const multiPartAsync = async (url: string, requestBody: any) => {
  // const encryptedBody = _wrap(requestBody);
  let appHeaders = {
    "Content-Type": "multipart/form-data",
    // token: Cookies.get("authToken") ?? "",
    // companyid: Cookies.get("companyId") ?? 1,
  };

  //  console.log("----------- This is my Headers Value look. ----------------",appHeaders)
  //  console.log("----------- This is my url Value look. ----------------",url)

  return axios
    .post(url, requestBody, { headers: appHeaders })
    .then((response: any) => {
      // console.log(`POST ${url}`);

      // console.log("received from server ", response.status);

      return response.data;
    });
};

const getAsync = async (url: string) => {
  // let appHeaders = {
  //   "Content-Type": "application/json; charset=utf-8",
  //   "Access-Control-Allow-Origin": "*",
  //   token: Cookies.get("authToken") ?? "",
  //   companyid: Cookies.get("companyId") ?? 1,
  // };

  return axios
    .get(url, {
      // headers: appHeaders,
      withCredentials: false,
    })
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return null;
    });
};

const deleteAsync = async (url: string) => {
  return axios.delete(url).then((response: any) => {
    return response?.data;
  });
};

const getBaseUrl = () => {
  //Local
  return "http://192.168.1.20:45001";
  // return "https://softgensolutions.in/service";
};

export {
  postAsync,
  getAsync,
  getBaseUrl,
  multiPartAsync,
  putAsync,
  deleteAsync,
};
