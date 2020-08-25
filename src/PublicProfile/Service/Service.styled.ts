import styled from "styled-components";
import * as Utility from "../../common/utility";
import { CommonButton } from "../../common/Button";

export const ServiceList = styled.div<{ totalCount: number }>`
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
  justify-content: center;

  ${(props) =>
    props.totalCount < 6 &&
    `
    justify-content: center;
  `}

  ${Utility.mediaBreakpointDown("lg")} {
    justify-content: center;
  }
  ${Utility.mediaBreakpointDown("sm")} {
    max-width: 425px;
    margin: 0 auto;
  }
`;

export const ServiceItem = styled.div`
  padding: 15px;
  flex-basis: 33.33%;
  display: flex;
  flex-direction: column;

  ${Utility.mediaBreakpointDown("md")} {
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
  background: #fff;
`;

export const ServiceTitle = styled.h3`
  font-weight: 700;
  margin: 0 0 15px 0;
  text-align: center;
  font-size: 20px;
`;

export const ServiceItemImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
  position: relative;
`;

export const ServiceItemImageContent = styled.img`
  width: auto;
  max-width: 100%;
  max-height: 8em;
  border-radius: 8px;
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
  margin: 0;
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

  > p {
    :after {
      content: " ";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: -webkit-linear-gradient(to bottom, rgba(255,255,255,0), #fff 80%);
    background: -moz-linear-gradient(to bottom, rgba(255,255,255,0), #fff 80%);
    background: linear-gradient(to bottom, rgba(255,255,255,0), #fff 80%);
    }
  }
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
  margin-top: 20px;
`;

export const ShowMoreContent = styled.div`
  text-align: center;
  margin-bottom: 15px;
`;
export const ShowMoreButton = styled(CommonButton)`
  border-radius: 25px;
  padding: 10px 20px;

  > div {
    display: flex;
    align-items: center;
  }
`;

export const EditHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;

  > svg {
    cursor: pointer;
  }
`;

export const AddServiceContainer = styled(ServiceContent)`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;
