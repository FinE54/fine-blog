// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMarkdownTags } from "blogs";

export default function handler(req, res) {
  const tagList = getMarkdownTags();
  res
    .status(200)
    .json({ code: 1, data: { list: tagList, total: tagList.length }, msg: "" });
}
