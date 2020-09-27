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
  categoryName: string | null;
  type: string;
}

declare module "array-shuffle" {
  export default function shuffle<T>(array: T[]): T[];
}
