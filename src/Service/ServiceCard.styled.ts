import styled from "styled-components";
import { CommonButton } from "../common/Button";

export const Card = styled.div<{ isPreview?: boolean }>`
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.12), 0 1px 6px rgba(0, 0, 0, 0.03),
    0 6px 10px -8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;

  ${(props) =>
    props.isPreview &&
    `
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;
export const CardHero = styled.div`
  position: relative;
  background: #e8e9eb;
`;
export const CardHeroImage = styled.div<{ src?: string | null }>`
  background-image: url(${(props) => props.src || "/fireside-icon.svg"});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: ${(props) => (props.src ? "cover" : "inherhit")};
  height: 200px;
`;
export const CardBody = styled.div`
  padding: 20px 15px;
  flex: 1;
`;
export const PreviewContainer = styled.div`
  border-top: 1px solid #e5eff5;
  padding: 15px;
`;

export const Pricing = styled.div`
  border-radius: 6px;
  background: #fff;
  position: absolute;
  padding: 5px 10px;
  color: #000;
  font-weight: bold;
  margin: 10px 0 0 10px;
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 16px;
`;
export const SubTitle = styled.p`
  font-weight: 500;
  color: rgb(112, 108, 100);
  text-align: center;
  margin: 5px 0 10px 0;
  font-size: 14px;
`;

export const CardTitle = styled.h3`
  margin: 0 0 10px 0;
  text-align: center;
  font-size: 20px;
`;

export const ServiceType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ServiceLabel = styled.div`
  border-radius: 6px;
  padding: 5px 10px;
  color: #fff;
  font-weight: bold;
  background: ${(props) => props.theme.primaryColor};
`;

export const Button = styled(CommonButton)`
  line-height: 1rem;
  word-break: break-all;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 500;
  border-radius: 25px;
  padding: 12px 40px;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 10px;
  margin-top: 25px;
`;

export const DescriptionContainer = styled.div<{ maxHeight?: boolean }>`
  position: relative;
  overflow: hidden;
  margin: 30px 0 0 0;

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

export const DescriptionShowMore = styled.div`
  text-align: center;
  margin-top: 12px;
  font-weight: bold;

  > a {
    cursor: pointer;
  }
`;

export const Share = styled.div`
  border-radius: 6px;
  background: #fff;
  position: absolute;
  padding: 5px;
  margin: 10px 10px 0 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
