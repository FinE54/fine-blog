import { defHttp } from "libs/request";

export const getList = (payload) => {
  return defHttp.get("/api/post", payload);
};

export const getPost = (path) => {
  return defHttp.get("/api/post/" + path);
};

export const getTags = (path) => {
  return defHttp.get("/api/tag");
};
