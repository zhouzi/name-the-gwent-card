import * as React from "react";
import styled from "styled-components";
import { VisualEffect } from "app/GameState";
import bronze from "design/assets/bronze.png";

const BIG_PREVIEW_IMG_SIZE = {
  width: 376,
  height: 540,
};

const ImageContainer = styled.div`
  position: relative;
  z-index: 0;
  width: ${BIG_PREVIEW_IMG_SIZE.width}px;
  height: ${BIG_PREVIEW_IMG_SIZE.height}px;
  background-color: ${(props) => props.theme.colors.background.dark};
  box-shadow: 12px 12px 30px ${(props) => props.theme.colors.background.dark};
  overflow: hidden;

  @media ${(props) => props.theme.breakpoints.up("small")} {
    z-index: 1;
    transform: rotateY(-5deg);
  }
`;

const ImageFrame = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${bronze});
  background-size: 100% 100%;
  transform: scale(1.02);
`;

const Image = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface CardWithVisualEffectsProps {
  card: GwentCard;
  visualEffects: VisualEffect[];
}

export function CardWithVisualEffects({
  card,
  visualEffects,
}: CardWithVisualEffectsProps) {
  return (
    <ImageContainer>
      <ImageFrame />
      <Image
        style={visualEffects.reduce(
          (acc, visualEffect) => {
            switch (visualEffect.type) {
              case "zoom":
                return {
                  ...acc,
                  backgroundSize: `${
                    BIG_PREVIEW_IMG_SIZE.width * visualEffect.zoom
                  }px ${BIG_PREVIEW_IMG_SIZE.height * visualEffect.zoom}px`,
                  backgroundPosition: "center center",
                };
              case "blur":
                return {
                  ...acc,
                  filter: `blur(${visualEffect.blur}px)`,
                };
              default:
                return acc;
            }
          },
          {
            backgroundImage: `url(https://playgwent.com${card.previewImg.big})`,
          }
        )}
      />
    </ImageContainer>
  );
}
