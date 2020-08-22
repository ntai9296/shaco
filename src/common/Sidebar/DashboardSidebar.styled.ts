import styled from "styled-components";
import { mediaBreakpointDown } from "../utility";

export const Sidebar = styled.aside`
  position: fixed;
  float: left;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fafafb;
  width: 270px;
  background: #fff;
  ${mediaBreakpointDown("md")} {
    display: none;
  }
`;

export const Brand = styled.div`
  padding: 24px 60px 24px 20px;

  img {
    max-width: 125px;
  }
`;

export const Profile = styled.div`
  display: flex;
  padding: 1rem;
  margin: 0 1rem 1rem;
  border: 1px solid rgb(229, 227, 221);
  border-radius: 10px;
  background: #fff;
  align-items: center;
  cursor: pointer;
`;

export const ProfilePlaceholder = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightgray;
  border-radius: 50%;

  > svg {
    color: #fff;
  }
`;

export const Avatar = styled.div`
  height: 64px;
  width: 64px;
  margin-right: 15px;

  > div {
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
`;
export const ProfileInfo = styled.div`
  flex: 1;
`;
export const ProfileName = styled.p`
  margin: 0 0 8px 0;
  font-weight: bold;
  font-size: 16px;
  color: #363636;
`;
export const ViewProfile = styled.div`
  color: ${(props) => props.theme.primaryColor};
  font-size: 13px;
  display: flex;
  align-items: center;
  font-weight: 500;

  > svg {
    margin-left: 5px;
  }
`;

export const SidebarItem = styled.div<{ isActive?: boolean }>`
  padding: 14px 24px;
  display: flex;
  align-items: center;
  color: #363636;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  font-weight: 500;

  > svg {
    margin-right: 15px;
  }

  :hover {
    background-color: #f5f5f5;
  }

  ${(props) =>
    props.isActive &&
    `
    background: ${props.theme.primaryColor};
    color: #fff;

    :hover {
      background: ${props.theme.primaryColor};

    }

  `}
`;

export const MenuTitle = styled.p`
  padding-bottom: 0.5rem;
  color: #92929d;
  text-indent: 6px;
  border-bottom: 1px solid #f1f1f5;
  margin: 16px;
  font-weight: 500;
`;
