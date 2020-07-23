import styled from "styled-components";

export const ServiceList = styled.div`
  margin-top: 25px;
  border-radius: ${(props) => props.theme.main.borderRadius};
  border: 1px solid rgb(229, 227, 221);
`;
export const ServiceItem = styled.div`
  border-bottom: 1px solid rgb(229, 227, 221);
  padding: 15px;
  user-select: none;

  :last-child {
    border-bottom: none;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ServiceAddItemButton = styled.div`
  padding: 15px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
`;

export const NotificationContainer = styled.div`
  margin-bottom: 10px;
`;

export const TrashButton = styled.a`
  cursor: pointer;
`;
