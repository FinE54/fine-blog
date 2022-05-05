// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getMarkdownList, getMarkdownContent } from 'blogs'

export default function handler(req, res) {
    const { query } = req
    const content = getMarkdownContent({ slug: query.path })
    res.status(200).json({ code: 1, data: content, msg: '' })
}
