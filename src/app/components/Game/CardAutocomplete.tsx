import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import Downshift from "downshift";
import { useLocaleContext } from "app/i18n";
import {
  InputGroup,
  Input,
  Button,
  AutocompleteList,
  AutocompleteListItem,
} from "design/components";
import { CardHints } from "./CardHints";

interface Props {
  card: GwentCard;
  onSubmit: (card: GwentCard) => void;
  children: React.ReactNode;
}

const AutocompleteContainer = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing.normal};
`;

export function CardAutocomplete({ card, onSubmit, children }: Props) {
  const intl = useIntl();
  const { fuse } = useLocaleContext();

  return (
    <Downshift<GwentCard> itemToString={(card) => card?.localizedName || ""}>
      {({
        getRootProps,
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
          {children}
          <AutocompleteContainer
            {...getRootProps({ refKey: "ref" }, { suppressRefError: true })}
          >
            <InputGroup>
              <Input
                {...getInputProps()}
                placeholder={intl.formatMessage({
                  id: "placeholder",
                })}
                autoFocus
              />
              <Button>
                <FormattedMessage id="submit" />
              </Button>
            </InputGroup>
            <AutocompleteList {...getMenuProps()}>
              {isOpen &&
                inputValue &&
                fuse
                  .search(inputValue)
                  .slice(0, 3)
                  .map((match) => match.item)
                  .map((card, index) => (
                    <AutocompleteListItem
                      {...getItemProps({
                        index,
                        key: card.id,
                        item: card,
                      })}
                      highlighted={highlightedIndex === index}
                      selected={selectedItem?.id === card.id}
                    >
                      {card.localizedName}
                    </AutocompleteListItem>
                  ))}
            </AutocompleteList>
          </AutocompleteContainer>
          <CardHints card={card} />
        </form>
      )}
    </Downshift>
  );
}
