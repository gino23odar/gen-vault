import { Heart, Trash2 } from 'lucide-react';
import { api } from '../../api/client';
import type { Bird } from '../../types';
import { useMemo, useState } from 'react';

export function BirdVault({ birds, onChange }: { birds: Bird[]; onChange: (birds: Bird[]) => void }) {
  const [filter, setFilter] = useState<'all' | 'favorites' | 'recent'>('all');

  const visible = useMemo(() => {
    if (filter === 'favorites') return birds.filter((b) => b.isFavorite);
    if (filter === 'recent') return [...birds].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return birds;
  }, [birds, filter]);

  async function toggleFavorite(id: string, isFavorite: boolean) {
    await api(`/api/birds/${id}/favorite`, { method: 'PATCH', body: JSON.stringify({ isFavorite }) });
    onChange(birds.map((bird) => (bird.id === id ? { ...bird, isFavorite } : bird)));
  }

  async function remove(id: string) {
    await api(`/api/birds/${id}`, { method: 'DELETE' });
    onChange(birds.filter((bird) => bird.id !== id));
  }

  return (
    <section className="glass rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Bird Vault</h2>
        <div className="flex gap-2">
          {['all', 'favorites', 'recent'].map((f) => (
            <button key={f} onClick={() => setFilter(f as typeof filter)} className="rounded-full border border-white/20 px-3 py-1 text-sm capitalize">
              {f}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-emerald-100/70">No birds yet. Generate one to populate your vault.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((bird) => (
            <article key={bird.id} className="rounded-xl border border-white/15 bg-black/20 p-3">
              <img src={bird.image2d?.thumbnailUrl} alt={bird.name} className="mb-3 h-40 w-full rounded-lg object-cover" />
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{bird.name}</h3>
                <span className="text-xs text-emerald-100/70">{bird.rarity}</span>
              </div>
              <p className="line-clamp-2 text-sm text-emerald-50/80">{bird.lore}</p>
              <p className="mt-2 text-xs text-emerald-100/60">3D Ref: {bird.asset3d?.modelUrl}</p>
              <div className="mt-3 flex gap-2">
                <button onClick={() => void toggleFavorite(bird.id, !bird.isFavorite)} className="rounded-lg border border-white/20 p-2" aria-label="Toggle favorite">
                  <Heart className={bird.isFavorite ? 'fill-rose-300 text-rose-300' : ''} size={16} />
                </button>
                <button onClick={() => void remove(bird.id)} className="rounded-lg border border-white/20 p-2" aria-label="Delete bird">
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
