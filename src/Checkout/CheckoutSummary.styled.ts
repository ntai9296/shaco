import styled from "styled-components";
import * as Utility from "../common/utility";

export const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: rgba(26, 26, 26, 0.6);
`;
export const Price = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin: 5px 0 3px 0;
`;
export const Description = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: rgba(26, 26, 26, 0.6);
`;

export const MoreData = styled.div`
  margin-top: 10px;
`;

export const ProductSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductSummaryInfoContainer = styled.div`
  ${Utility.mediaBreakpointDown("md")} {
    order: 3;
    text-align: center;
  }
`;

export const ProductImageContainer = styled.div`
  width: 300px;
  margin: 32px 0;
  display: flex;
  justify-content: center;

  ${Utility.mediaBreakpointDown("md")} {
    width: inherit;
    height: inherit;
    order: 2;
    margin-top: 0;
    margin-bottom: 16px;
  }

  > img {
    max-height: 300px;
    max-width: 300px;
    border-radius: 6px;
    ${Utility.mediaBreakpointDown("md")} {
      max-height: 120px;
    }
  }
`;

export const BackButtonContainer = styled.div`
  margin-bottom: 32px;

  ${Utility.mediaBreakpointDown("md")} {
    order: 1;
  }

  > a {
    display: inline-block;
  }
`;

export const BackButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  > svg {
    margin-right: 5px;
  }
`;
