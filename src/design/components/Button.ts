import styled from "styled-components";

export default styled.button`
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border: none;
  text-decoration: none;
  display: inline-block;

  cursor: pointer;
  font-weight: 700;
  padding: 1rem 2rem;
  color: #f3c053;
  border: 1px solid #f3c053;

  &:focus,
  &:hover {
    background-color: #1b1a18;
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.8;
  }
`;
