import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import classNames from "classnames";

import { primaryColor } from "config";

const navList = [
  { label: "Home", path: "/" },
  { label: "Archives", path: "/archives" },
  { label: "Github", path: "https://github.com/FinE54   " },
];

const Footer = (props) => {
  const { title, className, style } = props;
  return (
    <Styled className={classNames(className, "navigator")} style={style}>
      <div>Make by Fine with NextJS</div>
      <ul className="menu-list-wrap">
        {navList.map((item, index) => (
          <li key={item.label}>
            <Link href={item.path} passHref>
              <a target="_blank">{item.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Styled>
  );
};

const Styled = styled.div`
  color: #666;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 450px) {
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.1rem;
    >div{
        margin-bottom: 6px;
    }
  }
  .menu-list-wrap {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;

    > li {
      a {
        text-decoration: underline;

        &:hover {
          color: ${primaryColor};
        }
      }
      &:not(:first-child) {
        margin-left: 12px;
        padding-left: 12px;
        border-left: dotted 1px #666;
      }
    }
  }
`;

export default Footer;
