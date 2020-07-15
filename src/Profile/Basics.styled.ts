import styled from "styled-components";
import { Styling } from "../common/utility";

export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 32px -8px 0 -8px;
`;
export const BodyLeft = styled.div`
  flex-basis: 100%;
  max-width: 100%;
  padding: 0 8px;
`;
export const BodyRight = styled.div`
  flex-basis: 33.33%;
  max-width: 33.33%;
  padding: 0 8px;
`;

export const Panel = styled.div`
  padding: 18px;
  border: 1px solid rgb(229, 227, 221);
  border-radius: 5px;
  margin-bottom: 16px;
`;

export const CheckList = styled.h4`
  margin: 0;
`;
export const PageNameRow = styled.div`
  margin-bottom: ${Styling.rowMarginBottom};
`;
export const PageNameField = styled.div``;

export const CategoryRow = styled.div`
  margin-bottom: ${Styling.rowMarginBottom};
`;
export const ShortDescriptionRow = styled.div`
  margin-bottom: ${Styling.rowMarginBottom};
`;
export const CategoryField = styled.div``;
export const ShortDescriptionField = styled.div``;

export const Row = styled.div`
  margin-bottom: 24px;
`;
export const LeftCol = styled.div`
  flex-basis: 33%;
`;
export const RightCol = styled.div`
  flex-basis: 66%;
`;

export const ProfilePhotoField = styled.div``;
export const ChangePhoto = styled.div``;
export const DefaultPhoto = styled.div``;
export const ProfilePhoto = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  border: 2px solid white;
  cursor: pointer;
  position: relative;
  z-index: 1;

  > ${ChangePhoto} {
    display: none;
  }

  > ${DefaultPhoto} {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background: lightgrey;
    border-radius: 50%;
    position: absolute;
  }

  &:hover {
    > ${ChangePhoto} {
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      background: rgba(100, 100, 100, 0.5);
      border-radius: 50%;
      position: absolute;
    }
  }
`;

export const ChangeCoverPhoto = styled.div`
  color: #fff;
  display: none;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: rgba(100, 100, 100, 0.6);
`;

export const CoverPhoto = styled.div<{ url: string }>`
  background: #f8f7fa;
  height: 250px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;

  &:hover {
    > ${ChangeCoverPhoto} {
      display: flex;
    }
  }
`;

export const Label = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 16px;
  margin: 0 0 16px 0;
`;

export const PageURLInput = styled.input`
  border: none;
  border-bottom: 1px solid;
`;

export const SlugError = styled.p`
  color: ${Styling.dangerColor};
`;

export const CoverPhotoMessage = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;

export const IntroRow = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

export const IntroLeft = styled.div`
  flex: 1;
  padding-right: 8px;
`;
export const IntroRight = styled.div`
  flex: 1;
  padding-left: 8px;
`;
