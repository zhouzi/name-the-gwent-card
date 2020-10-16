import * as React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Link, List, ListItem } from "design/components";
import { messages } from "app/i18n/en";

type Hint = "cardType" | "faction" | "initials";

const HINTS: Hint[] = ["cardType", "faction", "initials"];

const CardHintsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;

  & > * {
    margin-right: ${(props) => props.theme.spacing.normal} !important;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const HintsList = styled(List)`
  margin-bottom: 0;
`;

const HintsListItem = styled(ListItem)`
  display: inline;

  &:not(:last-child)::after {
    content: ", ";
  }

  &:last-child::after {
    content: ".";
  }
`;

interface CardHintsProps {
  card: GwentCard;
}

export function CardHints({ card }: CardHintsProps) {
  const [hints, setHints] = React.useState<Hint[]>([]);

  return (
    <CardHintsContainer>
      {hints.length > 0 && (
        <HintsList>
          {hints.map((hint) => {
            if (hint === "cardType") {
              return (
                <HintsListItem>
                  <FormattedMessage
                    id="hintCardType"
                    values={{
                      cardType: card.type,
                    }}
                  />
                </HintsListItem>
              );
            }

            if (hint === "faction") {
              return (
                <HintsListItem>
                  <FormattedMessage
                    id="hintFaction"
                    values={{
                      faction: card.faction.slug,
                    }}
                  />
                </HintsListItem>
              );
            }

            if (hint === "initials") {
              return (
                <HintsListItem>
                  <FormattedMessage
                    id="hintInitials"
                    values={{
                      initials: card.localizedName
                        .split(" ")
                        .map((part) => `${part.charAt(0)}.`)
                        .join(" "),
                    }}
                  />
                </HintsListItem>
              );
            }

            return null;
          })}
        </HintsList>
      )}

      {hints.length < HINTS.length && (
        <Link
          as="button"
          type="button"
          onClick={() =>
            setHints((currentHints) => HINTS.slice(0, currentHints.length + 1))
          }
        >
          <FormattedMessage id="hint"
            {...messages.hint}
            values= {{remainCount: HINTS.length- hints.length}}
          />
        </Link>
      )}
    </CardHintsContainer>
  );
}
