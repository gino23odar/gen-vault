export type Bird = {
  id: string;
  name: string;
  prompt: string;
  style: string;
  mood: string;
  colorPalette: string;
  lore: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'MYTHIC';
  temperament: string;
  habitat: string;
  isFavorite: boolean;
  displayOrder: number;
  createdAt: string;
  image2d?: { thumbnailUrl: string; url: string };
  asset3d?: { modelUrl: string; previewUrl?: string };
};

export type User = {
  id: string;
  email: string;
  displayName: string;
};
