import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Drawer from "react-motion-drawer";
import { mediaBreakpointDown } from "../utility";
import { Menu as MenuIcon } from "react-feather";
import DashboardSidebar from "../Sidebar/DashboardSidebar";

const Nav = styled.nav`
  display: none;
  background-color: #fff;
  color: rgb(255, 255, 255);
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 40px;
  border: 1px solid rgb(229, 227, 221);
  height: 64px;

  width: 100%;
  z-index: 1200;
  background-color: rgb(255, 255, 255);
  position: fixed;

  ${mediaBreakpointDown("md")} {
    display: flex;
  }
  ${mediaBreakpointDown("sm")} {
    padding: 15px;
  }
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

const Logo = styled.a`
  cursor: pointer;

  > img {
    width: 125px;
  }
`;

const DrawerLayout = styled.div`
  background: #fff;

  > aside {
    display: block;
  }
`;

export default () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Nav>
      <NavBrand>
        <Link href="/">
          <Logo>
            <img src="/logo.svg" />
          </Logo>
        </Link>
      </NavBrand>
      <NavAction>
        <ActionList>
          <ActionItem>
            <AccountIcon onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
              <MenuIcon color="#000" />
            </AccountIcon>
          </ActionItem>
        </ActionList>
      </NavAction>

      <Drawer
        drawerStyle={{ overflow: "none", background: "#fff" }}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={270}
      >
        <DrawerLayout>
          <DashboardSidebar />
        </DrawerLayout>
      </Drawer>
    </Nav>
  );
};
