import { env } from '../config/env.js';
import { MockBirdAsset3DProvider, MockBirdImage2DProvider, MockLoreProvider } from './mock/mock.providers.js';
import type { BirdAsset3DProvider, BirdImage2DProvider, LoreProvider } from './types.js';

export type ProviderBundle = {
  loreProvider: LoreProvider;
  image2DProvider: BirdImage2DProvider;
  asset3DProvider: BirdAsset3DProvider;
  sourceName: string;
};

export function createProviders(): ProviderBundle {
  if (env.mockMode) {
    return {
      loreProvider: new MockLoreProvider(),
      image2DProvider: new MockBirdImage2DProvider(),
      asset3DProvider: new MockBirdAsset3DProvider(),
      sourceName: 'mock-suite',
    };
  }

  // TODO: Register real providers (OpenAI/local/custom) and select via env flags.
  throw new Error('Real providers are not yet configured. Set MOCK_MODE=true for local development.');
}
