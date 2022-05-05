import { useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";

import Navigator from "components/Navigator";
import Footer from "components/Footer";

import { getList } from "api/post";
import { primaryColor } from "config";

export default function Archives(props) {
  const { list, tag } = props;

  return (
    <div>
      <Head>
        <title>Archives ｜ 前端 WEB BANG! BANG!! BANG!!!</title>
        <meta
          name="keywords"
          content="前端, 博客, web前端博客, 模块化, 工程化, 前端数据监控, 性能优化, 网页制作, 前端, js, html5, css, 前端开发, 区块链, 网络, Vue.js, node.js"
        />
        <meta
          name="description"
          content="公众号: 前端帆仔。持续学习，持续写博客。此生理想、近期计划、今日功课。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Styled>
        <Navigator title="Hello Fine" />
        <div className="archives-card">
          <h3 className="archives-title">{tag ?? "Archives"}</h3>
          {list.map((item) => (
            <div className="archives-item" key={item.slug}>
              <div>{dayjs(item.date).format("YYYY-MM-DD")}</div>
              <Link href={`/blog/${item.slug}`} passHref>
                <a target="_blank">{item.title}</a>
              </Link>
            </div>
          ))}
        </div>
        <Footer />
      </Styled>
    </div>
  );
}

const Styled = styled.main`
  .archives-card {
    margin-bottom: 48px;

    a {
      color: #ccc;
      text-decoration: underline;
      margin-right: 6px;
      overflow: hidden;
      white-space: nowrap;

      &:hover {
        color: ${primaryColor};
      }
    }
    .archives-title {
      color: ${primaryColor};
      font-size: 1.6em;
      margin-bottom: 24px;
    }
    .archives-item {
      display: flex;
      margin-top: 6px;
      > div {
        &:first-child {
          margin-right: 24px;
          color: #666;
        }
      }
      > a {
        flex: 1;
      }
    }
  }
`;

/** @type {import('next').GetServerSideProps} */
export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const list = await getList({ tag: query?.tag ?? "", page: 1, size: 10000 });

  return {
    props: {
      list: list?.data.list ?? [],
      tag: query.tag ?? null,
    },
  };
};
