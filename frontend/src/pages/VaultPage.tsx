import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { BirdGenerator } from '../components/birds/BirdGenerator';
import { BirdVault } from '../components/birds/BirdVault';
import type { Bird } from '../types';

export function VaultPage() {
  const [birds, setBirds] = useState<Bird[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<{ birds: Bird[] }>('/api/birds')
      .then((res) => setBirds(res.birds))
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
      <BirdGenerator onGenerated={(bird) => setBirds((prev) => [bird, ...prev])} />
      {loading && <p>Loading vault...</p>}
      {error && <p className="text-red-300">{error}</p>}
      {!loading && <BirdVault birds={birds} onChange={setBirds} />}
    </main>
  );
}
