import React from "react";
import styled from "styled-components";
import { mediaBreakpointDown } from "../utility";

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
  margin: 0 -20px;
`;

export const Heading = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
  justify-content: space-between;
  font-size: 24px;
`;

export const HeadingContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeadingFilter = styled.div`
  display: flex;
  align-items: center;
`;

export const SubHeadingContainer = styled.div`
  margin-top: 15px;
`;

interface Props {
  children: any;
  title?: any;
  filter?: any;
  subHeading?: any;
}

export default ({ children, title, filter, subHeading }: Props) => {
  return (
    <Layout>
      <LayoutContainer>
        <HeadingContainer>
          <HeadingContent>
            <Heading>{title}</Heading>
            {filter && <HeadingFilter>{filter}</HeadingFilter>}
          </HeadingContent>
          {subHeading && (
            <SubHeadingContainer>{subHeading}</SubHeadingContainer>
          )}
        </HeadingContainer>
      <div>{children}</div>
      </LayoutContainer>
    </Layout>
  );
};
