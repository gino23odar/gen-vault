import type { BirdAsset3DProvider, BirdImage2DProvider, GenerateBirdInput, GeneratedLore, LoreProvider } from '../types.js';

const names = ['Mosswing', 'Glimmerbeak', 'Branchwhisper', 'Moonfeather', 'Thornlark'];
const habitats = ['Misty fern hollows', 'Moonlit canopy arches', 'Moss-blanketed stone circles', 'Ancient branch sanctuaries'];
const temperaments = ['Curious and ceremonious', 'Gentle but territorial', 'Playful and mystical', 'Silent and watchful'];
const rarities = ['COMMON', 'RARE', 'EPIC', 'MYTHIC'] as const;

export class MockLoreProvider implements LoreProvider {
  async generateLore(input: GenerateBirdInput): Promise<GeneratedLore> {
    const name = pick(names);
    return {
      name,
      lore: `${name} emerged from ${input.mood.toLowerCase()} winds, carrying hues of ${input.colorPalette}. It sings in ${input.style.toLowerCase()} rhythms beside old frog ponds and bear-trodden trails.`,
      rarity: pick(rarities),
      temperament: pick(temperaments),
      habitat: pick(habitats),
    };
  }
}

export class MockBirdImage2DProvider implements BirdImage2DProvider {
  async generateImage2D(input: GenerateBirdInput & { name: string }) {
    const encoded = encodeURIComponent(`${input.name} ${input.style} ${input.colorPalette}`);
    return {
      url: `https://placehold.co/1024x1024/1f3a2e/e8f3ea.png?text=${encoded}`,
      thumbnailUrl: `https://placehold.co/512x512/25483a/e8f3ea.png?text=${encoded}`,
    };
  }
}

export class MockBirdAsset3DProvider implements BirdAsset3DProvider {
  async generateAsset3D(input: GenerateBirdInput & { name: string }) {
    const safeName = input.name.toLowerCase().replace(/\s+/g, '-');
    return {
      modelUrl: `https://example.com/mock-models/${safeName}.glb`,
      previewUrl: `https://placehold.co/640x360/1f2c25/d8efe2.png?text=${encodeURIComponent(input.name + ' 3D')}`,
      format: 'glb',
    };
  }
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}
