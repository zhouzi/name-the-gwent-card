import * as React from "react";
import styled from "styled-components";

const BIG_PREVIEW_IMG_SIZE = {
  width: 376,
  height: 540,
};

const CardImageContainer = styled.div`
  width: ${BIG_PREVIEW_IMG_SIZE.width}px;
  height: 400px;
  border-radius: 2px;
  overflow: hidden;
  background-color: #000;
  background-position: center top;
  box-shadow: 0 10px 40px #000;

  @media (min-width: 800px) {
    height: ${BIG_PREVIEW_IMG_SIZE.height}px;
    transform: rotateY(-5deg);
    background-position: center center;
  }
`;

interface Props {
  card: Card;
  zoom: number;
}

export default function CardImage({ card, zoom }: Props) {
  return (
    <CardImageContainer
      style={{
        backgroundImage: `url(https://playgwent.com${card.previewImg.big})`,
        backgroundSize: `${BIG_PREVIEW_IMG_SIZE.width * zoom}px ${
          BIG_PREVIEW_IMG_SIZE.height * zoom
        }px`,
      }}
    />
  );
}
