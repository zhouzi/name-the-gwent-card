import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { GlobalStyle } from "design";
import "particles.js";

declare global {
  interface Window {
    particlesJS(id: string, options: Object): void;
  }
}

const LayoutContainer = styled.main`
  position: relative;
  z-index: 1;
  padding: 2rem;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Particles = styled.div`
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  React.useEffect(() => {
    window.particlesJS("particles-js", {
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
            value_area: 3000,
          },
        },
        color: {
          value: "#fd7907",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 3,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.8,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 4,
          random: true,
          anim: {
            enable: true,
            speed: 5,
            size_min: 0.01,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 500,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 7.8,
          direction: "top",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: false,
            mode: "bubble",
          },
          onclick: {
            enable: false,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 0.5,
            },
          },
          bubble: {
            distance: 400,
            size: 4,
            duration: 0.3,
            opacity: 1,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }, []);

  return (
    <>
      <Helmet
        link={[
          {
            rel: "stylesheet",
            href:
              "https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=Lato:wght@400;700&display=swap",
          },
        ]}
      />
      <GlobalStyle />
      <Particles id="particles-js" />
      <LayoutContainer>{children}</LayoutContainer>
    </>
  );
}
