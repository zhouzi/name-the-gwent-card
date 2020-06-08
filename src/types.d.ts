interface GwentCard {
  id: number;
  localizedName: string;
  previewImg: {
    big: string;
  };
  faction: {
    slug: string;
  };
  cardGroup: string;
}
