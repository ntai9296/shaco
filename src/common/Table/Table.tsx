import React from "react";
import styled from "styled-components";

const STable = styled.div`
  background: #fff;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.03),
    0 6px 10px -8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const STableHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SHeaderColumn = styled.div<{
  noPadding?: boolean;
  flex?: boolean;
  width?: number;
}>`
  border-bottom: 1px solid #e5eff5;
  letter-spacing: 0.1px;
  color: #738a94;
  text-transform: uppercase;
  padding: 10px 20px;
  white-space: nowrap;
  background: #f8fafc;
  font-size: 12px;

  ${(props) =>
    props.noPadding &&
    `
    padding: 10px;
  `}
  ${(props) =>
    props.flex &&
    `
    flex: 1;
  `}
  ${(props) =>
    props.width &&
    `
    width: ${props.width}px;
  `}
  
`;

const STableBody = styled.div``;
const SBodyEmpty = styled.div`
  padding: 50px 25px;
  text-align: center;
`;
const STableBodyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  cursor: pointer;
  border-top: 1px solid #e5eff5;
  font-size: 13px;
  position: relative;
  :hover {
    background: #f8fafc;
  }
`;
const STableBodyRowContent = styled.div<{
  noPadding?: boolean;
  flex?: boolean;
  width?: number;
}>`
  padding: 16px 20px;
  overflow: hidden;

  ${(props) =>
    props.noPadding &&
    `
    padding: 10px;
  `}
  ${(props) =>
    props.flex &&
    `
    flex: 1;
  `}
  ${(props) =>
    props.width &&
    `
    width: ${props.width}px;
  `}
`;

export default ({ children }: any) => {
  return <STable>{children}</STable>;
};

export const TableHeader = ({ children }: any) => {
  return <STableHeader>{children}</STableHeader>;
};

export const TableHeaderColumn = ({ children, ...props }: any) => {
  return <SHeaderColumn {...props}>{children}</SHeaderColumn>;
};
export const TableBody = ({ children }: any) => {
  return <STableBody>{children}</STableBody>;
};

export const TableBodyEmpty = ({ children }: any) => {
  return <SBodyEmpty>{children}</SBodyEmpty>;
};

export const TableBodyRow = ({ children }: any) => {
  return <STableBodyRow>{children}</STableBodyRow>;
};

export const TableBodyRowContent = ({ children, ...props }: any) => {
  return <STableBodyRowContent {...props}>{children}</STableBodyRowContent>;
};
