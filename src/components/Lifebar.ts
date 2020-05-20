import styled from "styled-components";

export default styled.div<{ remaining: number }>`
  width: ${(props) => `${Math.min(100, Math.max(0, props.remaining * 100))}%`};
  height: 6px;
  transform: skew(-25deg);
  background-color: #21bf6f;
  border: 1px solid #19ad62;
  box-shadow: inset 0 2px 0 #35d685, 0 0 10px #21bf6f;
`;
