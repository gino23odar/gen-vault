import { useState } from 'react';
import { api } from '../../api/client';
import type { Bird } from '../../types';

const styles = ['Cinematic Mythic', 'Ethereal Ink', 'Runic Realism'];
const moods = ['Calm', 'Mischievous', 'Ancient', 'Stormbound'];
const palettes = ['Moss + Gold', 'Moon Blue + Silver', 'Amber + Spruce'];

export function BirdGenerator({ onGenerated }: { onGenerated: (bird: Bird) => void }) {
  const [prompt, setPrompt] = useState('A branch-dancing guardian bird with glowing moss feathers');
  const [style, setStyle] = useState(styles[0]);
  const [mood, setMood] = useState(moods[0]);
  const [colorPalette, setColorPalette] = useState(palettes[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onGenerate() {
    setLoading(true);
    setError(null);
    try {
      const result = await api<{ bird: Bird }>('/api/birds/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt, style, mood, colorPalette }),
      });
      onGenerated(result.bird);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="mb-4 text-2xl font-semibold">Bird Prompt Generator</h2>
      <textarea className="mb-4 w-full rounded-xl border border-white/20 bg-black/25 p-3" rows={4} value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <div className="grid gap-3 md:grid-cols-3">
        <select className="rounded-lg border border-white/20 bg-black/30 p-2" value={style} onChange={(e) => setStyle(e.target.value)}>{styles.map((s) => <option key={s}>{s}</option>)}</select>
        <select className="rounded-lg border border-white/20 bg-black/30 p-2" value={mood} onChange={(e) => setMood(e.target.value)}>{moods.map((s) => <option key={s}>{s}</option>)}</select>
        <select className="rounded-lg border border-white/20 bg-black/30 p-2" value={colorPalette} onChange={(e) => setColorPalette(e.target.value)}>{palettes.map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      {error && <p className="mt-3 text-red-300">{error}</p>}
      <button onClick={() => void onGenerate()} disabled={loading} className="mt-4 rounded-lg bg-emerald-300/25 px-4 py-2 font-medium hover:bg-emerald-300/35">
        {loading ? 'Summoning...' : 'Generate Bird'}
      </button>
    </section>
  );
}
