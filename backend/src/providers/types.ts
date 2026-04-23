export type GenerateBirdInput = {
  prompt: string;
  style: string;
  mood: string;
  colorPalette: string;
};

export type GeneratedLore = {
  name: string;
  lore: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'MYTHIC';
  temperament: string;
  habitat: string;
};

export interface LoreProvider {
  generateLore(input: GenerateBirdInput): Promise<GeneratedLore>;
}

export interface BirdImage2DProvider {
  generateImage2D(input: GenerateBirdInput & { name: string }): Promise<{ url: string; thumbnailUrl: string }>;
}

export interface BirdAsset3DProvider {
  generateAsset3D(input: GenerateBirdInput & { name: string }): Promise<{ modelUrl: string; previewUrl?: string; format: string }>;
}
