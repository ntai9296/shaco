import styled from "styled-components";
import { Styling } from "../common/utility";
import { CommonButton } from "../common/Button";
import NumberFormat from "react-number-format";

export const Body = styled.div`
  margin: 32px 0 0 0;
`;

export const ServiceList = styled.div`
  grid-template-columns: repeat(3, 1fr);
  display: grid;
  gap: 15px;
`;

export const ServiceItem = styled.div`
  padding: 25px 18px;
  border: 1px solid rgb(229, 227, 221);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

export const ServicePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 18px;
  border: 1px solid rgb(229, 227, 221);
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  background: rgb(250, 250, 250);
  user-select: none;
`;

export const ServiceItemType = styled.div`
  text-align: end;
  margin-bottom: 7px;
`;
export const ServiceItemTypeEdit = styled.a`
  cursor: pointer;
`;
export const ServiceItemTitle = styled.h3`
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
export const ServiceItemImagePlaceholder = styled.div`
  border-radius: 5px;
  padding: 15px;
  background: rgb(250, 250, 250);
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  font-weight: bold;
`;
export const ServiceItemImageContent = styled.img`
  width: auto;
  max-width: 100%;
  max-height: 8em;
`;
export const ServiceItemPricing = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;
export const ServiceItemCost = styled.h2`
  margin: 0 0 5px 0;
  font-family: "Inter";
  font-size: 28px;
`;
export const ServiceItemDuration = styled.p`
  margin: 0 0 23px 0;
  color: rgb(112, 108, 100);
  text-transform: uppercase;
  font-weight: bold;
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
  font-size: 15px;
`;

export const AddServiceItem = styled.div`
  max-width: 500px;
  margin: auto;
`;

export const ServiceItemTitleInput = styled.input`
  border: none;
  font-weight: 700;
  text-align: center;
  font-size: 20px;
`;

export const ServiceItemCostInput = styled(NumberFormat)`
  border: none;
  font-weight: 700;
  text-align: center;
  margin: 0 0 5px 0;
  font-size: 28px;
`;

export const ServiceItemButtonTextInput = styled.input`
  border: none;
  font-size: 15px;
  font-weight: 400;
  background: transparent;
  color: #fff;
  text-align: center;

  ::placeholder {
    color: #fff;
  }
`;

export const ServiceItemDescriptionTextarea = styled.textarea`
  color: #3b3b3b;
  background-color: #fff;
  border: 1px solid #b1b1b1;
  max-width: 100%;
  width: 100%;
  line-height: 1.5;
  padding: 8px;
  border-radius: 8px;
  resize: vertical;
`;

export const ServiceItemHeader = styled.div`
  margin-bottom: 15px;
`;
export const ServiceItemDurationSelect = styled.select`
  color: rgb(112, 108, 100);
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  padding: 0;
  font-size: 15px;
`;

export const AddServiceItemActions = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ErrorMessage = styled.div`
  margin-top: 15px;
`;
export const CreateButton = styled(CommonButton)``;
export const CancelButton = styled(CommonButton)`
  color: ${Styling.dangerColor};
  margin-left: 15px;
  padding: 0;
  background: none;
`;
