import styled from "styled-components";
import { mediaBreakpointDown, Styling } from "../../common/utility";
import { CommonButton } from "../../common/Button";

export const Layout = styled.div`
  padding: 0 40px 40px 40px;
  max-width: 1100px;
  margin: auto;

  ${mediaBreakpointDown("sm")} {
    padding: 0;
  }
`;

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeadingContainer = styled.div`
  position: sticky;
  top: 0;
  padding: 30px 20px;
  background: #f2f4f7;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  margin: 0 -20px;
  flex-direction: column;
`;

export const Heading = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 24px;
  margin-bottom: 15px;
`;

export const SectionContainer = styled.section`
  margin-bottom: 25px;
`;

export const StatusLabel = styled.div`
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #e5eff5;
  color: #000;
  font-size: 14px;
  margin-left: 10px;
  font-weight: 500;
`;

export const BookingSubHeading = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubHeadingLeft = styled.div`
  display: flex;
  align-items: center;

  > div {
    display: flex;
    align-items: center;

    > svg {
      margin-right: 8px;
    }
    margin-right: 20px;
    :last-child {
      margin-right: 0;
    }
  }
`;

export const SubHeadingRight = styled.div`
  display: flex;
  align-items: center;
`;

export const MoreButton = styled.button`
  margin-right: 7px;
  padding: 9px 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.primaryColor};
  svg {
    color: ${(props) => props.theme.primaryColor};
  }
`;

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

  > h4 {
    margin-top: 0;
  }
`;

export const ActionBody = styled.div``;

export const CustomerBox = styled(ContentBox)`
  flex-basis: 35%;
`;

export const Row = styled.div`
  margin-bottom: 15px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;

  > span {
    margin-right: 20px;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  > label {
    margin-bottom: 8px;
  }
`;

export const DangerButton = styled(CommonButton)`
  background: #fff;
  color: ${Styling.dangerColor};
`;

export const RescheduleButton = styled(CommonButton)`
  color: ${Styling.blueColor};
  background: #fff;
`;

export const PrimaryButton = styled(CommonButton)`
  color: #fff;
  background: ${Styling.primaryColor};
`;
