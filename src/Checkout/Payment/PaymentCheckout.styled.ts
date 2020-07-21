import styled from "styled-components";
import { mediaBreakpointDown } from "../../common/utility";
import { setLightness } from "polished";

export const PaymentCheckoutContainer = styled.div``;
export const Title = styled.h3`
  font-size: 20px;
  margin-bottom: 30px;
  margin-top: 0px;

  ${mediaBreakpointDown("md")} {
    text-align: center;
  }
`;
export const PaymentCheckout = styled.form``;
export const Row = styled.div`
  margin-bottom: ${(props) => props.theme.main.rowMarginBottom};
`;
export const NameRow = styled(Row)`
  display: flex;
  margin-left: -10px;
  margin-right: -10px;

  > div {
    flex-basis: 50%;
    &:first-child {
      padding: 0 ${(props) => props.theme.main.columnPadding} 0 10px;
    }
    &:last-child {
      padding: 0 10px 0 ${(props) => props.theme.main.columnPadding};
    }
  }
`;

export const CardInput = styled.div`
  display: flex;
  flex-direction: column;
  > label {
    margin-bottom: 6px;
  }
  > div {
    color: #3b3b3b;
    background-color: #fff;
    border: 1px solid #b1b1b1;
    max-width: 100%;
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    font-size: 14px;

    &.StripeElement--focus {
      box-shadow: 0 0 0 2px
        ${(props) => setLightness(0.8, props.theme.main.primaryColor)};
      transition: box-shadow 0.3s ease-in-out !important;
    }
  }
`;
