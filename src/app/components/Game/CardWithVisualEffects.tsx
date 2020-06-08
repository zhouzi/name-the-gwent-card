import * as React from "react";
import styled from "styled-components";
import { VisualEffect } from "app/GameState";
import bronze from "design/assets/bronze.png";

interface Props {
  card: GwentCard;
  visualEffects: VisualEffect[];
}

const ImageContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 376px;
  height: 539px;
  transform: rotateY(-5deg);
  box-shadow: 12px 12px 30px ${(props) => props.theme.colors.background.dark};
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

const Image = styled.img`
  position: relative;
  z-index: 0;
`;

export function CardWithVisualEffects({ card, visualEffects }: Props) {
  return (
    <ImageContainer>
      <ImageFrame />
      <Image src={`https://playgwent.com${card.previewImg.big}`} alt="" />
    </ImageContainer>
  );
}
