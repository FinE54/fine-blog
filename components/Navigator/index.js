import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import classNames from "classnames";

import { primaryColor } from "config";

const navList = [
  { label: "Home", path: "/" },
  { label: "Archives", path: "/archives" },
  { label: "Github", path: "https://github.com/FinE54" },
];

const Navigator = (props) => {
  const { title, className, style } = props;
  return (
    <Styled className={classNames(className, "navigator")} style={style}>
      <div className="navigator-logo" />
      <div>
        <h2 className="navigator-title" onClick={() => Router.push("/")}>
          {title}
        </h2>
        <ul className="menu-list-wrap">
          {navList.map((item, index) => {
            const isURL = /(http|https):\/\/([\w.]+\/?)\S*/.test(item.path);
            return (
              <li key={item.label}>
                <Link href={item.path} passHref>
                  <a target={isURL ? "_blank" : null}>{item.label}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Styled>
  );
};

const Styled = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 48px;

  .navigator-logo {
    width: 48px;
    height: 48px;
    margin-right: 18px;
    background-image: url("/logo.png");
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center center;
    border-radius: 50%;
    overflow: hidden;
    filter: grayscale(20%);

    &:hover {
      filter: grayscale(0%);
    }
  }

  .navigator-title {
    font-size: 1.8em;
    margin-bottom: 4px;
    cursor: pointer;
  }
  .menu-list-wrap {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    color: ${primaryColor};
    font-size: 12px;

    > li {
      &:not(:first-child) {
        margin-left: 12px;
        padding-left: 12px;
        border-left: dotted 1px ${primaryColor};
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export default Navigator;
