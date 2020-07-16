import React, { useState } from "react";

import * as S from "./Hero.styled";
// import background from './background.jpg';
// import ModalVideo from '../ModalVideo';

interface Props {
  backgroundURL: string;
  avatarURL: string;
}

export default ({ backgroundURL, avatarURL }: Props) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => {
    setOpen(!open);
  };
  return (
    <S.BannerContainer>
      {/* <ModalVideo open={open} toggleModal={onOpenModal} /> */}
      <S.Banner backgroundURL={backgroundURL}>
        <div>
          <a onClick={() => setOpen(true)}>
            <S.BannerImage avatarURL={avatarURL} />
          </a>
        </div>
      </S.Banner>
    </S.BannerContainer>
  );
};
