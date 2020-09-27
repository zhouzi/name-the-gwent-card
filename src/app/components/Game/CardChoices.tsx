import * as React from "react";
import shuffle from "array-shuffle";
import { CardID } from "app/GameState";
import { useLocaleContext } from "app/i18n";
import { Button, InlineList, InlineListItem } from "design/components";

interface Props {
  card: GwentCard;
  onSubmit: (card: GwentCard) => void;
  children: React.ReactNode;
}

export function CardChoices({ card, onSubmit, children }: Props) {
  const [choices, setChoices] = React.useState<CardID[]>([]);
  const { cards } = useLocaleContext();

  React.useEffect(() => {
    const sameFaction = cards.filter(
      (otherCard) => otherCard.faction.slug === card.faction.slug
    );
    const sameFactionAndType = sameFaction.filter(
      (otherCard) => otherCard.type === card.type
    );

    const cardCategoryNames =
      card.categoryName?.split(",").map((name) => name.trim()) || [];
    const sameFactionAndTypeAndCategory = sameFactionAndType.filter(
      (otherCard) =>
        otherCard.categoryName === card.categoryName ||
        cardCategoryNames.some((name) => otherCard.categoryName?.includes(name))
    );

    console.log({
      sameFactionAndTypeAndCategory,
      sameFactionAndType,
      sameFaction,
    });

    setChoices(
      shuffle(
        [card.id].concat(
          shuffle(sameFactionAndTypeAndCategory)
            .concat(shuffle(sameFactionAndType))
            .concat(shuffle(sameFaction))
            .map((card) => card.id)
            .filter(
              (cardID, index, cardIDs) => cardIDs.indexOf(cardID) === index
            )
            .filter((cardID) => cardID !== card.id)
            .slice(0, 2)
        )
      )
    );
  }, [card, cards]);

  return (
    <>
      {children}

      <InlineList>
        {choices.map((cardID) => {
          const choiceCard = cards.find(
            (otherCard) => otherCard.id === cardID
          )!;

          return (
            <InlineListItem key={choiceCard.id}>
              <Button
                variant="outline"
                size="small"
                type="button"
                onClick={() => onSubmit(choiceCard)}
              >
                {choiceCard.localizedName}
              </Button>
            </InlineListItem>
          );
        })}
      </InlineList>
    </>
  );
}
