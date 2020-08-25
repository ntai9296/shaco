import styled from "styled-components";
import { mediaBreakpointDown } from "../../common/utility";

export const List = styled.div`
  display: flex;
  margin: -10px;
  flex-wrap: wrap;
  padding-bottom: 40px;
`;

export const ListItem = styled.div`
  flex-basis: 33.33%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  ${mediaBreakpointDown("lg")} {
    flex-basis: 50%;
  }
  ${mediaBreakpointDown("xs")} {
    flex-basis: 100%;
  }
`;

export const ListItemPreview = styled.div`
  border-top: 1px solid #e5eff5;
  padding: 10px 15px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.03),
    0 6px 10px -8px rgba(0, 0, 0, 0.1);
  background: #fff;
  border-radius: 10px;
  margin-top: -2px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DragIcon = styled.div`
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid rgb(229, 227, 221);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-right: 5px;
`;

export const EditIcon = styled.div`
  cursor: pointer;
  border-radius: 6px;
  border: 1px solid rgb(229, 227, 221);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

export const PreviewAction = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
export const PreviewStatus = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin-left: 8px;
    color: ${(props) => props.theme.primaryColor};
    font-weight: 500;
  }
`;
