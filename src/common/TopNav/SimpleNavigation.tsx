import React, { useState } from "react";
import styled from "styled-components";
import Link from "../Link";
import * as UserAPI from "../../../graphql/User/UserAPI";
import Popover from "react-tiny-popover";
import { Styling } from "../utility";

const Nav = styled.nav`
  background-color: #fff;
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 40px;
  box-shadow: 0 2px 4px rgba(81, 107, 152, 0.16);
`;

const NavBrand = styled.div``;
const NavAction = styled.div``;
const ActionList = styled.ul`
  margin: 0;
  padding: 0;
`;
const ActionItem = styled.li``;
const AccountIcon = styled.a`
  > img {
    width: 26px;
    height: 26px;

    :hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
`;

const Logo = styled.div`
  max-width: 12rem;
  width: 100%;
  background: url(https://siromortgage.com/static/img/brand.svg) no-repeat;
  background-size: contain;
  background-position: 0;
  font-size: 0;
  width: 100px;
  height: 30px;
`;

const Menu = styled.div`
  background: #fff;
  color: #4a4a4a;
  border: none;
  left: auto;
  right: 0;
  padding: 0;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  overflow: hidden;
  width: 200px;
`;

const MenuItem = styled.div`
  display: block;
  padding: 15px 20px;
  clear: both;
  font-weight: normal;
  line-height: 1.428571429;
  color: #333;
  white-space: nowrap;

  :hover {
    color: #4a4a4a;
    background: #f2f2f2;
    cursor: pointer;
  }

  ${(props) =>
    props.color &&
    `
    color: ${props.color};
    :hover {
      color: ${props.color};
    }
  `}
`;

export default () => {
  const { data: userData, loading: userLoading } = UserAPI.getCurrentUser();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Nav>
      <NavBrand>
        <Link to="/">
          <Logo>Pantheon</Logo>
        </Link>
      </NavBrand>
      <NavAction>
        <ActionList>
          {userData?.currentUser?.id && (
            <ActionItem>
              <Popover
                onClickOutside={() => setIsPopoverOpen(!isPopoverOpen)}
                isOpen={isPopoverOpen}
                position="bottom"
                containerStyle={{ overflow: "visible" }}
                windowBorderPadding={15}
                content={
                  <Menu>
                    <MenuItem
                      onClick={() => {
                        setIsPopoverOpen(!isPopoverOpen);
                        UserAPI.logoutUser();
                      }}
                      color={Styling.dangerColor}
                    >
                      Sign out
                    </MenuItem>
                  </Menu>
                }
              >
                <AccountIcon onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                  <img src="https://cdn.loom.com/assets/img/icons/default-avatar-ebe1838db4ae0479fc7c17d10e504e7f.svg" />
                </AccountIcon>
              </Popover>
            </ActionItem>
          )}
        </ActionList>
      </NavAction>
    </Nav>
  );
};
