import * as React from "react";
import styled from "styled-components";

interface InputRadioProps {
  name: string;
  value: string;
  children: React.ReactNode;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}

const InputRadioLabel = styled.label``;

const InputRadioInput = styled.input`
  width: 14px;
  height: 14px;
  margin-right: ${(props) => props.theme.spacing.normal};
  vertical-align: middle;
`;

export function InputRadio({
  name,
  value,
  onChange,
  checked,
  children,
}: InputRadioProps) {
  return (
    <InputRadioLabel>
      <InputRadioInput
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
      {children}
    </InputRadioLabel>
  );
}
