import styled from "styled-components";
import { mediaBreakpointDown } from "../../common/utility";

export const ContentContainer = styled.div``;
export const ContentTitle = styled.div`
  margin-bottom: 10px;
`;
export const ContentBox = styled.div`
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.03),
    0 6px 10px -8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
  padding: 16px 20px;
`;

export const Row = styled.div`
  margin-bottom: 15px;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  > label {
    margin-bottom: 8px;
  }
`;
