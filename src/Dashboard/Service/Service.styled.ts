import styled from "styled-components";
import Button from "../../common/Button";

export const ServiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ServiceLeftContainer = styled.div`
  max-width: 500px;
  width: 100%;
`;

export const ServiceRightContainer = styled.div`
  flex: 1;
  margin-left: 25px;
  width: 350px;
`;

export const ServicePreviewContainer = styled.div`
  position: fixed;
  width: inherit;

  > h3 {
    text-align: center;
  }
`;

export const HeadingContainer = styled.a`
  margin: 0 0 25px 0;
  display: inline-block;
`;
export const Heading = styled.div`
  font-weight: bold;
  font-size: 28px;
  display: flex;
  align-items: center;
  cursor: pointer;
  > svg {
    margin-right: 8px;
  }
`;
export const HeadingInfo = styled.p`
  font-weight: 500;
`;

export const NewServiceContainer = styled.div`
  border: ${(props) => props.theme.main.border};
  border-radius: 13px;
  padding: 30px 25px;
  margin-bottom: 25px;
`;

export const NewServiceHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;

  > span {
    font-weight: bold;
    font-size: 23px;
  }
`;

export const Step = styled.div`
  background: black;
  border-radius: 8px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #fff;
  margin-right: 15px;
`;

export const Row = styled.div`
  margin-bottom: ${(props) => props.theme.main.rowMarginBottom};
`;

export const RowTwo = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  margin-bottom: ${(props) => props.theme.main.rowMarginBottom};
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  > label {
    margin-bottom: 6px;
  }
`;
export const FieldGroupTwo = styled(FieldGroup)`
  flex-basis: 50%;
  padding: 0 10px;
`;

export const ImagePlaceholder = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  border-radius: 10px;
  padding: 15px;
  background: rgb(250, 250, 250);
  flex-direction: column;
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

export const DeleteImageButton = styled.a`
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px;
  background: #fff;
  border-radius: 50%;
  margin: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ServiceImageContainer = styled.div<any>`
  height: 200px;
  border-radius: 10px;
  background: rgb(250, 250, 250);

  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  position: relative;
  overflow: hidden;

  :hover {
    ${ServiceItemImageHover} {
      display: flex;
    }
  }
`;

export const ScreeningQuestionList = styled.div`
  border: ${(props) => props.theme.main.border};
  border-radius: 6px;
`;

export const ScreeningQuestionItem = styled.div`
  padding: 15px;
  border-bottom: ${(props) => props.theme.main.border};
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;

  > b {
    font-size: 16px;
  }
  > input {
    border: none;
    flex: 1;
    font-size: 14px;
    margin-left: 10px;
  }
  > a {
    cursor: pointer;
  }
`;

export const AddScreeningQuestion = styled.div`
  padding: 15px;
  font-weight: bold;
  text-align: center;
  user-select: none;
  cursor: pointer;
  border-bottom: none;
`;

export const EditServiceActionContainer = styled.div`
  display: flex;
`;

export const DeleteButton = styled(Button)`
  background: #fff;
  color: ${(props) => props.theme.main.dangerColor};
`;
