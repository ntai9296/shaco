import styled from "styled-components";
import * as Utility from "../../common/utility";
import { CommonButton } from "../../common/Button";

export const ServiceList = styled.div<{ totalCount: number }>`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px 10px -10px;

  ${(props) =>
    props.totalCount < 3 &&
    `
    justify-content: center;
  `}
`;

export const ServiceItem = styled.div`
  padding: 10px;
  flex-basis: 33.33%;

  ${Utility.mediaBreakpointDown("lg")} {
    flex-basis: 50%;
  }
  ${Utility.mediaBreakpointDown("sm")} {
    flex-basis: 100%;
  }
`;

export const ServiceContent = styled.div`
  padding: 25px 18px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(229, 227, 221);
  border-radius: 5px;
  height: 100%;
  width: 100%;
`;

export const ServiceTitle = styled.h3`
  font-weight: 700;
  margin: 0 0 15px 0;
  text-align: center;
  font-size: 20px;
`;

export const ServiceItemImageHover = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;
  background: rgba(100, 100, 100, 0.5);
  color: #fff;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
`;

export const ServiceItemImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;

  position: relative;

  :hover {
    > ${ServiceItemImageHover} {
      display: flex;
    }
  }
`;

export const ServiceItemImageContent = styled.img`
  width: auto;
  max-width: 100%;
  max-height: 8em;
`;

export const ServiceItemPricing = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

export const ServiceItemCost = styled.h2`
  margin: 0 0 5px 0;
  font-size: 28px;
`;

export const ServiceItemDuration = styled.p`
  margin: 0 0 23px 0;
  color: rgb(112, 108, 100);
  text-transform: uppercase;
  font-weight: bold;
  font-size: 13px;
`;

export const ServiceItemDescriptionBox = styled.div<{ maxHeight?: boolean }>`
  position: relative;
  overflow: hidden;
  margin: 0;

  > p {
    margin: 0;
    white-space: break-spaces;
  }

  ${(props) =>
    props.maxHeight &&
    `
  max-height: 120px;
  `}
`;

export const ServiceItemDescriptionShowMore = styled.div`
  text-align: center;
  margin-top: 12px;
  font-weight: bold;

  > a {
    cursor: pointer;
  }
`;

export const ServiceItemAction = styled.div``;
export const ServiceItemButton = styled(CommonButton)`
  border-radius: 25px;
  padding: 12px 40px;
  font-size: 16px;
  font-weight: 500;
`;

export const ShowMoreContent = styled.div`
  text-align: center;
  margin-bottom: 15px;
`;
export const ShowMoreButton = styled(CommonButton)`
  border-radius: 25px;
  padding: 15px 25px;
`;
