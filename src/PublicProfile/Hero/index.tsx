import React, { useState } from "react";
import { Play, Pause, X, Volume2, VolumeX } from "react-feather";
import ReactPlayer from "react-player";
import * as S from "./Hero.styled";
import { isVideoURL } from "../../common/utility";

interface Props {
  backgroundURL: string;
  avatarURL: string;
  introVideoURL: string;
}

export default ({ backgroundURL, avatarURL, introVideoURL }: Props) => {
  const [open, setOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [videoMuted, setVideoMuted] = useState(true);
  const isVideo = isVideoURL(avatarURL);
  return (
    <S.BannerContainer>
      <S.Banner backgroundURL={backgroundURL}>
        <div>
          <S.BannerImage avatarURL={isVideo ? "" : avatarURL}>
            {isVideo && (
              <S.PlayerContainer>
                <S.OverlayContainer
                  onClick={() => {
                    setOpen(true);
                    setVideoMuted(false);
                  }}
                ></S.OverlayContainer>
                <ReactPlayer
                  playing={videoPlaying && !open}
                  width="100%"
                  height="100%"
                  url={introVideoURL}
                  controls={false}
                  onEnded={() => setVideoPlaying(false)}
                  playsinline
                  muted={videoMuted}
                  loop
                />
              </S.PlayerContainer>
            )}
          </S.BannerImage>
        </div>
      </S.Banner>
      <S.Modal
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        style={{
          overlay: {
            zIndex: 100,
            backgroundColor: "rgba(50, 50, 50, 0.8)",
            overflow: "auto",
            overflowY: "scroll",
          },
        }}
        ariaHideApp={false}
        isOpen={open}
        onRequestClose={() => setOpen(false)}
      >
        <S.ModalContainer>
          <S.PlayerContainer>
            <S.OverlayContainer onClick={() => setVideoPlaying(!videoPlaying)}>
              <S.ExitPlayer
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  setVideoMuted(true);
                  setVideoPlaying(true);
                }}
              >
                <X color="#fff" size={35} />
              </S.ExitPlayer>
              <S.PlayerControl>
                <div>
                  {videoPlaying ? (
                    <Pause color="#fff" size={35} />
                  ) : (
                    <Play color="#fff" size={35} />
                  )}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoMuted(!videoMuted);
                  }}
                >
                  {videoMuted ? (
                    <VolumeX color="#fff" size={35} />
                  ) : (
                    <Volume2 color="#fff" size={35} />
                  )}
                </div>
              </S.PlayerControl>
            </S.OverlayContainer>
            <ReactPlayer
              playing={videoPlaying}
              width="100%"
              height="100%"
              url={introVideoURL}
              controls={false}
              playIcon={<div>dasd</div>}
              onEnded={() => setVideoPlaying(false)}
              playsinline
              muted={videoMuted}
            />
          </S.PlayerContainer>
        </S.ModalContainer>
      </S.Modal>
    </S.BannerContainer>
  );
};
