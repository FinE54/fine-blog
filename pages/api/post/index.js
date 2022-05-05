// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMarkdownList } from "blogs";

export default function handler(req, res) {
  const {
    query: { page = 1, size = 10, tag },
  } = req;
  const markdownList = getMarkdownList().filter((item) => {
    if (!tag) return true;
    return item.tags.includes(tag);
  });

  const start = (page - 1) * size;
  const end = start + size - 1;

  const resList = markdownList.slice(start, end);
  res.status(200).json({
    code: 1,
    data: { list: resList, total: markdownList.length },
    msg: "",
  });
}
