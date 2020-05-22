import { createGlobalStyle } from "styled-components";
import backgroundImage from "../assets/bg-simple-1440.jpg";
import "modern-normalize/modern-normalize.css";

export default createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: Lato, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 400;
    color: #dcdbcc;
    background-color: #121315;
    background-image: url(${backgroundImage});
    background-repeat: repeat-y;
    background-position: center top;
    background-size: cover;
  }
`;
