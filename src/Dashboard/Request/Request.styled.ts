import styled from "styled-components";
import { mediaBreakpointDown } from "../../common/utility";

export const Layout = styled.div`
  padding: 0 40px 40px 40px;
  max-width: 1100px;
  margin: auto;

  ${mediaBreakpointDown("sm")} {
    padding: 0;
  }
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeadingContainer = styled.div`
  position: sticky;
  top: 0;
  padding: 30px 20px;
  background: #f2f4f7;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  margin: 0 -20px;
`;

export const Heading = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
  justify-content: space-between;
  font-size: 24px;
`;

export const HeadingFilter = styled.div`
  display: flex;
  align-items: center;
`;
export const FilterButton = styled.div`
  background: #fff;
  font-weight: 400;
  color: #343f44;
  padding: 5px 10px 6px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.01), 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
  border: none;
  border-right: 1px solid #f8fafc;
  border-radius: 0;
  white-space: nowrap;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 13px;

  :first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  :last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  > svg {
    margin-left: 5px;
  }
`;

export const SectionContainer = styled.section`
  margin-bottom: 25px;
`;

export const BookingTable = styled.div`
  background: #fff;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.03),
    0 6px 10px -8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const BookingTableHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const HeaderColumn = styled.div<{ noPadding?: boolean; flex?: boolean }>`
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
`;

export const BookingTableBody = styled.div``;
export const BookingBodyEmpty = styled.div`
  padding: 50px 25px;
  text-align: center;
`;
export const BookingTableBodyRow = styled.div`
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
export const RequestTableBodyContent = styled.div<{
  noPadding?: boolean;
  flex?: boolean;
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
`;

export const ServiceName = styled.h3`
  margin: 0 0 3px 0;
  font-size: 14px;
  font-weight: 500;
`;

export const ServiceDescription = styled.p`
  margin: 3px 0 0 0;
  color: #54666d;
`;

export const StatusLabel = styled.div`
  color: #738a94;
  background: #e5eff5;
  display: inline-block;
  border-radius: 3px;
  padding: 3px 5px;
  text-align: center;
`;

export const FilterList = styled.div``;
export const FilterItem = styled.div`
  padding: 10px;
  cursor: pointer;
  :hover {
    background: #f2f4f7;
  }
`;
