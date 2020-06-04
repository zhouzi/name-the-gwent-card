import * as React from "react";
import { FormattedMessage } from "react-intl";
import Downshift from "downshift";
import styled, { css } from "styled-components";
import { Panel, Heading, InputGroup, Input, Button, Lifebar } from "design";
import CardsContext from "app/containers/CardsContainer";

interface Props {
  onSubmit: (userAnswer: {
    username: string | null;
    answer: Card | null;
  }) => void;
  startedAt: Date;
  endsAt: Date;
}

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
  const cards = React.useContext(CardsContext);

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
              onSubmit({
                username: null,
                answer: selectedItem,
              });
            }}
            autoComplete="off"
          >
            <Heading as="label" {...getLabelProps()}>
              <FormattedMessage
                id="whatCard"
                defaultMessage="What's the name of this card?"
              />
            </Heading>
            <Lifebar startedAt={startedAt} endsAt={endsAt} />
            <InputGroup>
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
                    cards.search(inputValue).map((card, index) => (
                      <SuggestionsItem
                        {...getItemProps({
                          index,
                          key: card.id,
                          item: card,
                        })}
                        highlighted={highlightedIndex === index}
                        selected={selectedItem?.id === card.id}
                      >
                        {card.localizedName}
                      </SuggestionsItem>
                    ))}
                </Suggestions>
              </InputGroupInput>
              <Button type="submit">
                <FormattedMessage id="send" defaultMessage="Send" />
              </Button>
            </InputGroup>
          </form>
        )}
      </Downshift>
    </Panel>
  );
}
