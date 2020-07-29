import React, { useState } from "react";
import Link from "next/link";
import * as S from "./header.styled";

interface Props {
  avatarURL: string;
  name: string;
}

const Header = ({ avatarURL, name }: Props) => {
  const [open, setOpen] = useState(false);

  const styledOpen = open
    ? { right: 0, bottom: 0, height: "100%", overflow: "auto" }
    : {};
  const styledContentOpen = !open ? { display: "none" } : {};
  const styledHiddenBorder = open ? { border: "none" } : {};

  return (
    <S.HeaderWrapper>
      <div className="wrap">
        <S.MobileWrap style={styledOpen}>
          <div>
            <S.HeaderContainer style={styledHiddenBorder}>
              <S.HeaderLeft>
                <Link href="/">
                  <S.Logo>
                    <img src="/logo.svg" />
                  </S.Logo>
                </Link>
              </S.HeaderLeft>

              {/* <S.HeaderRight>
                <ul>
                  <li>
                    <LinkMenuWrap>
                      <a href='/login'>Log in</a>
                    </LinkMenuWrap>
                  </li>
                  <li>
                    <S.LinkMenuWrap>
                      <a>
                        <S.MenuIcon>
                          <span className="menu">
                            {!open && (
                              <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => setOpen(true)}
                              >
                                <path
                                  d="M2.25 18.003h19.5M2.25 12.003h19.5M2.25 6.003h19.5"
                                  data-stroke="1"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            )}

                            {open && (
                              <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => setOpen(false)}
                              >
                                <path
                                  d="M21 3l-9 9m-9 9l9-9m0 0l9 9m-9-9L3 3"
                                  data-stroke="1"
                                  strokeLinecap="round"
                                  strokeLinejoin="bevel"
                                ></path>
                              </svg>
                            )}
                          </span>
                        </S.MenuIcon>
                      </a>
                    </S.LinkMenuWrap>
                  </li>
                </ul>
              </S.HeaderRight> */}
            </S.HeaderContainer>
          </div>
          <S.MobileContent style={styledContentOpen}>
            <S.MobileLable>
              <div>
                <Link href="/login">
                  <a>
                    <div>
                      <span>Log in</span>
                    </div>
                  </a>
                </Link>
              </div>
            </S.MobileLable>
            <S.MobileLable>
              <div>
                <Link href="/sign-up">
                  <a className="last-child">
                    <div>
                      <span>Sign up</span>
                    </div>
                  </a>
                </Link>
              </div>
            </S.MobileLable>
          </S.MobileContent>
        </S.MobileWrap>
      </div>

      <div className="wrap">
        <div className="content">
          <S.HeaderTag>
            <S.HeaderLeft>
              <Link href="/">
                <S.Logo>
                  <img src="/logo.svg" />
                </S.Logo>
              </Link>
            </S.HeaderLeft>
          </S.HeaderTag>
        </div>
      </div>
    </S.HeaderWrapper>
  );
};

export default Header;
