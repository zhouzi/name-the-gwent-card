import * as React from "react";
import Downshift from "downshift";
import Fuse from "fuse.js";
import styled, { css } from "styled-components";
import cards from "../cards.json";
import Panel from "./Panel";
import Heading from "./Heading";
import InputGroup from "./InputGroup";
import Input from "./Input";
import Button from "./Button";
import Paragraph from "./Paragraph";
import Lifebar from "./Lifebar";

interface Props {
  onSubmit: (userAnswer: Card) => void;
  startedAt: Date;
  endsAt: Date;
}

const fuse = new Fuse(cards, {
  keys: ["localizedName"],
  includeScore: true,
  minMatchCharLength: 3,
  shouldSort: true,
});

const InputGroupInput = styled.div`
  flex: 1;
  position: relative;
`;

const Suggestions = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  position: absolute;
  z-index: 10;
  top: 100%;
  left: 0;
  width: 100%;
`;

const SuggestionsItem = styled.li<{
  highlighted: boolean;
  selected: boolean;
}>`
  font-weight: ${(props) => (props.selected ? "700" : "400")};
  padding: 1rem 2rem 1rem 1rem;
  background-color: #15100e;

  ${(props) =>
    props.highlighted &&
    css`
      color: #f3c053;
      background-color: #2b201e;
    `}
`;

export default function QuestionPanel({ onSubmit, startedAt, endsAt }: Props) {
  return (
    <Panel>
      <Downshift itemToString={(card) => card?.localizedName || ""}>
        {({
          getRootProps,
          getLabelProps,
          getInputProps,
          getMenuProps,
          getItemProps,
          inputValue,
          highlightedIndex,
          selectedItem,
          isOpen,
        }) => (
          <form
            onSubmit={(event) => {
              event.preventDefault();

              if (selectedItem == null) {
                return;
              }

              onSubmit(selectedItem);
            }}
            autoComplete="off"
          >
            <Heading as="label" {...getLabelProps()}>
              What's the name of this card?
            </Heading>
            <Lifebar startedAt={startedAt} endsAt={endsAt} />
            <Paragraph as={InputGroup}>
              <InputGroupInput
                {...getRootProps({ refKey: "ref" }, { suppressRefError: true })}
              >
                <Input
                  {...getInputProps()}
                  type="text"
                  placeholder="Submit your answer..."
                  autoFocus
                />
                <Suggestions {...getMenuProps()}>
                  {isOpen &&
                    inputValue &&
                    fuse
                      .search(inputValue)
                      .slice(0, 3)
                      .map((match, index) => (
                        <SuggestionsItem
                          {...getItemProps({
                            index,
                            key: match.item.id,
                            item: match.item,
                          })}
                          highlighted={highlightedIndex === index}
                          selected={selectedItem?.id === match.item.id}
                        >
                          {match.item.localizedName}
                        </SuggestionsItem>
                      ))}
                </Suggestions>
              </InputGroupInput>
              <Button type="submit">Send</Button>
            </Paragraph>
          </form>
        )}
      </Downshift>
    </Panel>
  );
}
