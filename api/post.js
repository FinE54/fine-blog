import { defHttp } from "libs/request";
import { getMarkdownList, getMarkdownContent, getMarkdownTags } from "blogs";

export const getList = async ({ page = 1, size = 10, tag }) => {
  const markdownList = getMarkdownList().filter((item) => {
    if (!tag) return true;
    return item.tags.includes(tag);
  });

  const start = (page - 1) * size;
  const end = start + size - 1;

  const resList = markdownList.slice(start, end);

  return Promise.resolve({
    code: 1,
    data: { list: resList, total: markdownList.length },
    msg: "",
  });
};

export const getPost = async (path) => {
  const content = getMarkdownContent({ slug: path });
  return Promise.resolve({ code: 1, data: content, msg: "" });
};

export const getTags = async () => {
  const tagList = getMarkdownTags();
  return Promise.resolve({
    code: 1,
    data: { list: tagList, total: tagList.length },
    msg: "",
  });
};
