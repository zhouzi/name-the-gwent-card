import * as React from "react";
import styled from "styled-components";

const BIG_PREVIEW_IMG_SIZE = {
  width: 376,
  height: 540,
};

const CardImageContainer = styled.div`
  width: ${BIG_PREVIEW_IMG_SIZE.width}px;
  height: ${BIG_PREVIEW_IMG_SIZE.height}px;
  border-radius: 2px;
  overflow: hidden;
  transform: rotateY(-5deg);
  background-color: #000;
  box-shadow: 0 10px 40px #000;
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
        backgroundPosition: "center center",
        backgroundSize: `${BIG_PREVIEW_IMG_SIZE.width * zoom}px ${
          BIG_PREVIEW_IMG_SIZE.height * zoom
        }px`,
      }}
    />
  );
}
