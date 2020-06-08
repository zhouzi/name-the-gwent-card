import styled from "styled-components";

export const InputGroup = styled.div`
  display: flex;

  & > *:first-child {
    flex: 1;
  }
`;

export const Input = styled.input`
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border: none;

  width: 100%;
  border: 1px solid transparent;
  background-color: ${(props) => props.theme.colors.background.light};
  padding: ${(props) =>
    [
      props.theme.spacing.normal,
      props.theme.spacing.large,
      props.theme.spacing.normal,
      props.theme.spacing.normal,
    ].join(" ")};

  ::placeholder {
    color: ${(props) => props.theme.colors.text.light};
  }
`;

interface InputHintProps {
  variant?: "text" | "error";
}

export const InputHint = styled.div<InputHintProps>`
  margin-top: 0.4rem;
  font-size: 0.9rem;
  color: ${(props) =>
    props.variant === "error"
      ? props.theme.colors.danger.main
      : props.theme.colors.text.main};
`;
