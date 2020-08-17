import React from "react";
import styled from "styled-components";

const Box = styled.div`
  box-shadow: 0 0 1px rgba(0,0,0,0.12), 0 1px 6px rgba(0,0,0,0.03), 0 6px 10px -8px rgba(0,0,0,0.1);
  padding: 15px 20px;
  border-radius: 5px;
  background: #fff;
`;

export default ({ children }: any) => <Box>{children}</Box>;
