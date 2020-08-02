import styled from "styled-components";
import { mediaBreakpointDown } from "../common/utility";

export const LayoutContainer = styled.div`
  padding: 40px 50px;

  ${mediaBreakpointDown("xs")} {
    padding: 40px 15px;
  }
`;

export const ServicesHeading = styled.h1`
  display: flex;
  align-items: center;
  margin-top: 0;
  > a {
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #444;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 45px;
  flex-wrap: wrap;
`;

export const HeaderBackContainer = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  > svg {
    margin-right: 5px;
  }

  ${mediaBreakpointDown("xs")} {
   flex-basis: 100%;
   position: relative;
   margin-bottom: 15px;
  }
`;
export const HeaderStepContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const Step = styled.div<{ active?: boolean; checked?: boolean }>`
  background: #fff;
  color: ${(props) =>
    props.theme.primaryColor};
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  border: 1px solid
    ${(props) => props.theme.primaryColor};
  cursor: pointer;

  ${(props) =>
    (props.active || props.checked) &&
    `
  background: ${props.theme.primaryColor};
  color: #fff;
  `}

  :last-child {
    margin-right: 0;
  }
`;

export const BodyContainer = styled.div``;
export const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 520px;
  margin: 0 auto 20px auto;

  > h1 {
    font-weight: 900;
    text-align: center;
    margin: 0 auto 10px auto;
    font-size: 30px;
  }
  > p {
    text-align: center;
    margin: 0 auto 10px auto;
    font-size: 16px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
`;

export const ContentBox = styled.div`
  margin-bottom: 25px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(229, 227, 221);
  border-radius: 13px;
  padding: 30px 25px;
  max-width: 500px;
  width: 500px;
`;

export const Row = styled.div`
  margin-bottom: 15px;
`;
export const Field = styled.div``;
