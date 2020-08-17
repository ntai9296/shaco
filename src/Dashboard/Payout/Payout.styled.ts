import styled from "styled-components";
import { CommonButton } from "../../common/Button";

export const Section = styled.section`
  margin-bottom: 45px;
`;

export const PayoutInformationBox = styled.div`
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.03),
    0 6px 10px -8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
  padding: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PayoutHistoryBox = styled.section`
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.03),
    0 6px 10px -8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
  padding: 16px 20px;
  display: flex;
  align-items: center;
`;

export const ConnectBox = styled.div`
  max-width: 500px;
  margin: auto;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.03),
    0 6px 10px -8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #fff;
  padding: 35px;
`;
export const ConnectTitle = styled.h1`
  margin: 0 0 20px 0;
  text-align: center;
  font-size: 18px;
`;

export const ConnectSubTitle = styled.p`
  margin: 0 0 15px 0;
  text-align: center;
`;

export const PayoutHistoryTitle = styled.h3``;
export const EditPayout = styled.a`
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
`;
export const PayoutLabel = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
`;
export const PayoutData = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

export const PayoutDataContainer = styled.div`
  display: flex;
  flex: 1;
  > div {
    margin-right: 70px;

    :last-child {
      margin-right: 0;
    }
  }
`;

export const PayoutButton = styled(CommonButton)`
  border-radius: 40px;
  padding: 15px 27px;
  font-weight: bold;
`;

export const SubHeadingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  > div {
    margin-right: 20px;
  }
`;

export const TableH3 = styled.h3`
  margin: 0 0 3px 0;
  font-size: 14px;
  font-weight: 500;
`;
export const TableP = styled.p`
  margin: 3px 0 0 0;
  color: #54666d;
`;
