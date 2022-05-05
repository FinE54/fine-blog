/**
 * blogs  目录为博客文章目录
 * 使用 markdown 文件作为内容来源
 * 使用此 JS 文件暴露读取 blogs 目录下所有 md 后缀文件
 * 并读取 blogs 下的 md 文件内容，供给其他函数进行读取
 * 
 * 使用 gray-matter 解析 md 文件，分离 md 及页面数据
 * 使用 js-yaml 解析 gray-matter 获取到的数据
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import yaml from 'js-yaml'

const blogsDirector = path.join(process.cwd(), "blogs")

const matterMarkdownFile = (file) => {
    const fullPath = path.join(blogsDirector, file)

    const content = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(content, {
        engines: {
            yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
    });

    const { title, slug, author, date, tags, keywords, description } = matterResult.data
    const fileName = file.replace(/\.md$/, '')
    const createTime = fs.statSync(fullPath).ctime

    return {
        data: {
            title: title ?? fileName,
            slug: slug ?? fileName,
            fileName,
            author,
            date: date ?? createTime,
            tags: [...new Set(tags ?? [])],
            keywords: keywords ?? [],
            description: description ?? ''
        },
        content: matterResult.content
    }
}
export const getMarkdownList = () => {
    const markdownList = fs.readdirSync(blogsDirector).filter(filename => /\.md$/.test(filename))

    const blogsList = markdownList.map((mdFile) => {
        return matterMarkdownFile(mdFile).data
    })

    return blogsList.sort((a, b) => a.date < b.date ? 1 : -1)
}

export const getMarkdownContent = ({ slug, fileName }) => {
    const blogsList = getMarkdownList()

    let file = ''
    if (fileName) {
        file = `${fileName}.md`
    } else {
        const blog = blogsList.find(blog => blog.slug === slug)
        if (!blog) throw new Error(`not match path ${slug}, please check a path and try again`)
        file = `${blog.fileName}.md`
    }
    const content = matterMarkdownFile(file)

    const index = getContentIndex(content.data);
    const prevBlog = index > 0 ? blogsList[index - 1] : null
    const nextBlog = index + 1 < blogsList.length ? blogsList[index + 1] : null

    return Object.assign(content, { prevBlog, nextBlog })
}

export const getMarkdownTags = () => {
    const blogsList = getMarkdownList()

    const tags = blogsList.reduce((set, { tags }) => (tags.forEach((tag) => {
        set.add(tag)
    }), set), new Set())

    return [...tags]
}

export const getContentIndex = (content) => {
    const markdownList = getMarkdownList()
    const contentItem = markdownList.find((markdown) => markdown.fileName === content.fileName)
    const index = markdownList.indexOf(contentItem)
    return index
}