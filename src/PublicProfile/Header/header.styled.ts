import styled from "styled-components";

export const HeaderWrapper = styled.div`
  width: 100%;
  position: fixed;
  z-index: 100;
  top: 0px;

  div.wrap {
    box-sizing: border-box;
    padding-top: 0rem;
    padding-right: 0rem;
    padding-bottom: 0rem;
    padding-left: 0rem;
    margin-top: 0rem;
    margin-right: 0rem;
    margin-bottom: 0rem;
    margin-left: 0rem;
    transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;

    div.content {
      z-index: 1100;
      display: none;

      @media (min-width: 48rem) {
        display: block;
      }
      @media (min-width: 64rem) {
        display: block;
      }
    }
  }
`;

export const HeaderTag = styled.header`
  z-index: 1200;
  -webkit-box-align: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 64px;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid rgb(229, 227, 221);
  grid-column-gap: 1rem;
  padding: 0px 1rem;
`;

export const HeaderLeft = styled.div`
  display: flex;
`;

export const HeaderRight = styled.div`
  justify-self: end;

  ul {
    margin: 0px;
    padding: 0px;
    align-items: center;
    display: flex;
    list-style: none;

    li {
      position: relative;
      display: inline-flex;
    }
  }
`;

export const LinkMenuWrap = styled.div`
  @media (min-width: 64rem) {
    padding-right: 0rem;
    padding-left: 1.125rem;
  }

  box-sizing: border-box;
  padding-top: 0rem;
  padding-right: 0rem;
  padding-bottom: 0rem;
  padding-left: 1.0125rem;
  margin-top: 0rem;
  margin-right: 0rem;
  margin-bottom: 0rem;
  margin-left: 0rem;
  transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;

  a {
    color: rgb(34, 29, 17);
    text-decoration: none;
    cursor: pointer;
    font-size: 1rem;
  }
`;

export const InputSearchWrap = styled.div`
  box-sizing: border-box;
  padding-top: 0rem;
  padding-right: 0.28125rem;
  padding-bottom: 0rem;
  padding-left: 0.84375rem;
  margin-top: 0rem;
  margin-right: 0rem;
  margin-bottom: 0rem;
  margin-left: 0rem;
  transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;

  @media (min-width: 64rem) {
    padding-left: 0.9375rem;
    padding-right: 0.3125rem;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    position: relative;
    display: inline-flex;
    padding: 1rem 0rem;

    div {
      box-sizing: border-box;
      display: block;
      padding-top: 0rem;
      padding-right: 0rem;
      padding-bottom: 0rem;
      padding-left: 0rem;
      margin-top: 0rem;
      margin-right: 0rem;
      margin-bottom: 0rem;
      margin-left: 0rem;
      transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;

      @media (min-width: 48rem) {
        display: flex;
      }

      div {
        box-sizing: border-box;
        -webkit-box-flex: 2;
        flex-grow: 2;
        padding-top: 0rem;
        padding-right: 0rem;
        padding-bottom: 0rem;
        padding-left: 0rem;
        margin-top: 0rem;
        margin-right: 0rem;
        margin-bottom: 0rem;
        margin-left: 0rem;
        transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
      }
    }
  }
`;

export const FormControl = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 0em;

  div.searchForm {
    background-color: rgb(245, 244, 242);
    cursor: default;
    position: absolute;
    right: 0px;
    width: auto;
    z-index: 1000;
    border-radius: 9999px;
    padding: 0.5rem 0.75rem;

    div {
      align-self: center;
      box-sizing: border-box;
      position: relative;
      padding-top: 0rem;
      padding-right: 0rem;
      padding-bottom: 0rem;
      padding-left: 0rem;
      margin-top: 0rem;
      margin-right: 0rem;
      margin-bottom: 0rem;
      margin-left: 0rem;
      transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;

      div {
        background-color: transparent;
        margin-bottom: 0px;
        cursor: pointer;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
        padding: 0px;

        div {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          padding-top: 0rem;
          padding-right: 0rem;
          padding-bottom: 0rem;
          padding-left: 0rem;
          margin-top: 0rem;
          margin-right: 0rem;
          margin-bottom: 0rem;
          margin-left: 0rem;
          transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;

          div {
            align-self: center;
            -webkit-box-align: center;
            align-items: center;
            display: inline-flex;
            filter: none;
            cursor: pointer;
            vertical-align: unset;
            height: unset;
            width: unset;

            span.iconSearch {
              height: 1rem;
              width: 1rem;

              svg {
                overflow: hidden;
                align-self: center;
                fill: transparent;
                stroke-width: 1.2px;
                height: 1rem;
                width: 1rem;

                [data-stroke] {
                  stroke: rgb(112, 108, 100);
                  fill: transparent;
                  vector-effect: non-scaling-stroke;
                  transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
                }
              }
            }
          }

          input {
            background-color: rgb(245, 244, 242);
            font-weight: 500;
            line-height: 1rem;
            padding-left: 0.75rem;
            text-overflow: ellipsis;
            width: 13rem;
            z-index: 900;
            font-size: 1rem;
            border-width: 0px;
            border-style: initial;
            border-color: initial;
            border-image: initial;
            transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
`;

export const FormMobileControl = styled.form`
  display: block;
  -webkit-box-align: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 0px 0px;

  div.searchForm {
    background-color: rgb(245, 244, 242);
    cursor: default;
    border-radius: 9999px;
    padding: 0.5rem 0.75rem;

    div {
      align-self: center;
      box-sizing: border-box;
      padding-top: 0rem;
      padding-right: 0rem;
      padding-bottom: 0rem;
      padding-left: 0rem;
      margin-top: 0rem;
      margin-right: 0rem;
      margin-bottom: 0rem;
      margin-left: 0rem;
      transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;

      div {
        background-color: transparent;
        margin-bottom: 0px;
        cursor: pointer;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
        padding: 0px;

        div {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          padding-top: 0rem;
          padding-right: 0rem;
          padding-bottom: 0rem;
          padding-left: 0rem;
          margin-top: 0rem;
          margin-right: 0rem;
          margin-bottom: 0rem;
          margin-left: 0rem;
          transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;

          div {
            align-self: center;
            -webkit-box-align: center;
            align-items: center;
            display: inline-flex;
            filter: none;
            cursor: pointer;
            vertical-align: unset;
            height: unset;
            width: unset;

            span.iconSearch {
              height: 1rem;
              width: 1rem;

              svg {
                overflow: hidden;
                align-self: center;
                fill: transparent;
                stroke-width: 1.2px;
                height: 1rem;
                width: 1rem;

                [data-stroke] {
                  stroke: rgb(112, 108, 100);
                  fill: transparent;
                  vector-effect: non-scaling-stroke;
                  transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
                }
              }
            }
          }

          input {
            background-color: rgb(245, 244, 242);
            font-weight: 500;
            line-height: 1rem;
            padding-left: 0.75rem;
            text-overflow: ellipsis;
            width: 100%;
            z-index: 900;
            font-size: 1rem;
            border-width: 0px;
            border-style: initial;
            border-color: initial;
            border-image: initial;
            transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
`;

export const MobileLable = styled.header`
  padding-left: 1rem;
  padding-right: 1rem;
  font-family: aktiv-grotesk, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  a.last-child {
    -webkit-box-align: center;
    align-items: center;
    border-top-width: initial;
    border-right-width: initial;
    border-left-width: initial;
    display: flex;
    flex-direction: row;
    height: 3.75rem;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    background: none;
    border-style: none none none;
    border-color: initial;
    border-image: initial;
    border-radius: 0px;
    outline: none;
    padding: 0px;
    border-bottom: 0px;
  }
  a {
    cursor: pointer;
    text-decoration: none;
    -webkit-box-align: center;
    align-items: center;
    border-top-width: initial;
    border-right-width: initial;
    border-left-width: initial;
    border-top-color: initial;
    border-right-color: initial;
    border-left-color: initial;
    display: flex;
    flex-direction: row;
    height: 3.75rem;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    background: none;
    border-style: none none solid;
    border-image: initial;
    border-radius: 0px;
    outline: none;
    padding: 0px;
    border-bottom: 1px solid rgb(229, 227, 221);
    div {
      -webkit-box-align: center;
      align-items: center;
      box-sizing: border-box;
      display: flex;
      padding-top: 0rem;
      padding-right: 0rem;
      padding-bottom: 0rem;
      padding-left: 0rem;
      margin-top: 0rem;
      margin-right: 0rem;
      margin-bottom: 0rem;
      margin-left: 0rem;
      transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
      span {
        color: rgb(36, 30, 18);
        display: block;
        font-family: aktiv-grotesk, sans-serif;
        position: relative;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 550 !important;
        font-size: 1rem !important;
        line-height: 1.5 !important;
        margin: 0px;
        overflow: hidden;
        transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
      }
    }
  }
`;

export const MobileWrap = styled.header`
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 0px 0px;
  left: 0px;
  position: fixed;
  top: 0px;
  z-index: 1100;
  white-space: nowrap;
  width: 100%;
  display: block;
  /* right: 0px;
  bottom: 0px;
  height: 100%;
  overflow: auto; */

  @media (min-width: 64rem) {
    display: none;
  }

  @media (min-width: 48rem) {
    display: none;
  }
`;

export const MobileContent = styled.header`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 64px;
`;

export const HeaderContainer = styled.header`
  z-index: 1101;
  -webkit-box-align: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 64px;
  position: fixed;
  width: 100%;
  border-bottom: 1px solid rgb(229, 227, 221);
  grid-column-gap: 1rem;
  padding: 0px 1rem;
`;

export const MenuIcon = styled.div`
  align-self: center;
  -webkit-box-align: center;
  align-items: center;
  display: inline-flex;
  filter: none;
  cursor: unset;
  vertical-align: unset;
  height: unset;
  width: unset;

  span.menu {
    height: 1.5rem;
    width: 1.5rem;
    display: flex;

    svg {
      align-self: center;
      fill: transparent;
      stroke-width: 1.2px;
      height: 1.5rem;
      width: 1.5rem;
      overflow: hidden;

      [data-stroke] {
        stroke: rgb(36, 30, 18);
        vector-effect: non-scaling-stroke;
        transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
      }
    }
  }
`;

export const Logo = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  > span {
    font-weight: 700;
    font-size: 20px;
    color: rgb(36, 30, 18);
  }
`;
