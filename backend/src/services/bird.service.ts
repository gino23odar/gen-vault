import { z } from 'zod';
import { prisma } from '../utils/prisma.js';
import { createProviders } from '../providers/index.js';

const generateBirdSchema = z.object({
  prompt: z.string().min(3),
  style: z.string().min(2),
  mood: z.string().min(2),
  colorPalette: z.string().min(2),
});

export async function generateBird(userId: string, payload: unknown) {
  const input = generateBirdSchema.parse(payload);
  const providers = createProviders();

  const lore = await providers.loreProvider.generateLore(input);
  const image2d = await providers.image2DProvider.generateImage2D({ ...input, name: lore.name });
  const asset3d = await providers.asset3DProvider.generateAsset3D({ ...input, name: lore.name });

  const maxOrder = await prisma.bird.aggregate({
    where: { userId },
    _max: { displayOrder: true },
  });

  const displayOrder = (maxOrder._max.displayOrder ?? -1) + 1;

  const bird = await prisma.bird.create({
    data: {
      userId,
      name: lore.name,
      prompt: input.prompt,
      style: input.style,
      mood: input.mood,
      colorPalette: input.colorPalette,
      lore: lore.lore,
      rarity: lore.rarity,
      temperament: lore.temperament,
      habitat: lore.habitat,
      providerSource: providers.sourceName,
      displayOrder,
      image2d: { create: { ...image2d, provider: providers.sourceName } },
      asset3d: { create: { ...asset3d, provider: providers.sourceName } },
    },
    include: { image2d: true, asset3d: true },
  });

  await prisma.promptHistory.create({
    data: { userId, ...input },
  });

  return bird;
}

export async function listBirds(userId: string) {
  return prisma.bird.findMany({
    where: { userId },
    include: { image2d: true, asset3d: true },
    orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
  });
}

export async function getBird(userId: string, birdId: string) {
  return prisma.bird.findFirst({
    where: { id: birdId, userId },
    include: { image2d: true, asset3d: true },
  });
}

export async function toggleFavorite(userId: string, birdId: string, isFavorite: boolean) {
  await prisma.bird.updateMany({ where: { id: birdId, userId }, data: { isFavorite } });
  return getBird(userId, birdId);
}

export async function reorderBirds(userId: string, ids: string[]) {
  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.bird.updateMany({
        where: { id, userId },
        data: { displayOrder: index },
      }),
    ),
  );
}

export async function deleteBird(userId: string, birdId: string) {
  await prisma.bird.deleteMany({ where: { id: birdId, userId } });
}

export async function listPromptHistory(userId: string) {
  return prisma.promptHistory.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 30 });
}

export async function listFieldBirds(userId: string) {
  return prisma.bird.findMany({
    where: { userId },
    include: { image2d: true, asset3d: true },
    take: 24,
    orderBy: { createdAt: 'desc' },
  });
}
