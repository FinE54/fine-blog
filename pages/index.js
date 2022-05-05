import { useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";

import Navigator from "components/Navigator";
import Footer from "components/Footer";

import { getList, getTags } from "api/post";
import { primaryColor } from "config";

export default function Home(props) {
  const { list, tags } = props;

  return (
    <div>
      <Head>
        <title>Hello Fine ｜ 前端 WEB BANG! BANG!! BANG!!!</title>
        <meta
          name="keywords"
          content="前端, 博客, web前端博客, 模块化, 工程化, 前端数据监控, 性能优化, 网页制作, 前端, js, html5, css, 前端开发, 区块链, 网络, Vue.js, node.js"
        />
        <meta
          name="description"
          content="公众号: 前端帆仔。持续学习，持续写博客。此生理想、近期计划、今日功课。"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Styled>
        <Navigator title="Hello Fine" />
        <div style={{ marginBottom: 48 }}>
          <p>
            {`What doesn't kill you makes you stronger.`}
            <br />
            那些杀不死你的，终将使你变得更强大。
          </p>
        </div>
        <div className="archives-card">
          <h3 className="archives-title">Archives</h3>
          {list.map((item) => (
            <div className="archives-item" key={item.slug}>
              <div>{dayjs(item.date).format("YYYY-MM-DD")}</div>
              <Link href={`/blog/${item.slug}`} passHref>
                <a target="_blank">{item.title}</a>
              </Link>
            </div>
          ))}
        </div>
        <div className="archives-card">
          <h3 className="archives-title">Tags</h3>
          <div>
            {tags.map((tag) => (
              <Link href={`/archives/${tag}`} key={tag} passHref>
                <a target="_blank">{tag}</a>
              </Link>
            ))}
          </div>
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

export const getStaticProps = async (ctx) => {
  const list = await getList({ page: 1, size: 10 });
  const tags = await getTags();

  return {
    props: {
      list: list?.data.list ?? [],
      tags: tags?.data.list ?? [],
    },
  };
};
