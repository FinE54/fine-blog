import { useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

import Navigator from "components/Navigator";
import Footer from "components/Footer";

import { getList, getPost } from "api/post";
import { primaryColor } from "config";

export default function Archives(props) {
  const {
    post: { data, content, prevBlog, nextBlog },
  } = props;

  return (
    <div>
      <Head>
        <title>{data.title} ｜ 前端 WEB BANG! BANG!! BANG!!!</title>
        <meta
          name="keywords"
          content={[...(data.tags ?? []), ...(data.keywords ?? [])].join(",")}
        />
        <meta name="description" content={data.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Styled>
        <div className="header-content">
          <h1 className="header-title">{data.title}</h1>
          <div className="content-detail-wrap">
            <span>{dayjs(data.date).format("YYYY-MM-DD")}</span>
            <span>
              {data.tags.map((tag) => (
                <Link key={tag} href={`/archives?tag=${tag}`} passHref>
                  <a target={"_blank"}>{tag}</a>
                </Link>
              ))}
            </span>
          </div>
        </div>
        <div className="archives-content">
          <ReactMarkdown linkTarget={"_blank"} remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
        <Footer />
      </Styled>
    </div>
  );
}

const Styled = styled.main`
  a {
    &:not(:last-child) {
      margin-right: 12px;
    }
    color: #ccc;
    text-decoration: underline;
    margin-right: 6px;
    overflow: hidden;
    white-space: nowrap;

    &:hover {
      color: ${primaryColor};
    }
  }
  .header-content {
    margin-bottom: 48px;
    .header-title {
      color: ${primaryColor};
      font-size: 1.6em;
    }
    .content-detail-wrap {
      margin-top: 6px;
      > span {
        + span {
          &::before {
            content: "|";
            padding: 0 4px;
          }
        }
      }
    }
  }

  .archives-content {
    position: relative;
    margin-bottom: 48px;

    > h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 1.2em;
      &::before {
        content: "#";
        position: absolute;
        left: -1rem;
        color: ${primaryColor};
      }
    }
    > h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      margin-bottom: 1rem;
      line-height: 2rem;
      text-align: justify;
      word-break: break-all;
    }
    > p {
      font-weight: 400;
    }

    li {
      padding: 6px 0;
    }

    table,
    th,
    td {
      padding: 4px 8px;
      text-align: left !important;
      color: #ccc;
      border: 1px solid #666;
      border-collapse: collapse;
    }
  }
`;

/** @type {import('next').GetStaticProps} */
export const getStaticProps = async (ctx) => {
  const { params } = ctx;
  const post = await getPost(params.slug);

  return {
    props: {
      post: post?.data,
      tag: params.tag ?? null,
    },
  };
};

/** @type {import('next').GetStaticPaths} */
export const getStaticPaths = async (ctx) => {
  const { query } = ctx;
  const list = await getList({ page: 1, size: 10000 }).then(
    (res) => res?.data.list ?? []
  );

  return {
    paths: list.map((item) => ({ params: { slug: item.slug } })),
    fallback: "blocking",
  };
};
