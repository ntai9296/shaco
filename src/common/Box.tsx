import React from "react";
import styled from "styled-components";

const Box = styled.div`
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02);
  padding: 32px;
  border-radius: 8px;
`;

export default ({ children }: any) => <Box>{children}</Box>;
