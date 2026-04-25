import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { HeroScene } from '../components/scene/HeroScene';
import { FieldScene } from '../components/scene/FieldScene';
import type { Bird } from '../types';

export function LandingPage({ reduced }: { reduced: boolean }) {
  const { scrollYProgress } = useScroll();
  const [morphProgress, setMorphProgress] = useState(0);
  const [birds, setBirds] = useState<Bird[]>([]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setMorphProgress(Math.min(1, latest * 1.5));
  });

  useEffect(() => {
    api<{ birds: Bird[] }>('/api/field/birds')
      .then((result) => setBirds(result.birds))
      .catch(() => setBirds([]));
  }, []);

  return (
    <main>
      <section id="hero" className="relative mx-auto grid min-h-[85vh] max-w-7xl grid-cols-1 items-center gap-8 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-emerald-200/70">Placeholder Product Copy</p>
          <h1 className="mb-4 text-5xl font-semibold leading-tight">Forge mythic birds in a cinematic woodland vault.</h1>
          <p className="max-w-xl text-emerald-50/80">A premium fantasy creation suite where froggies whisper, bears guard old runes, and every generated bird carries lore in both 2D and 3D forms.</p>
        </div>
        <motion.div style={{ rotateY: reduced ? 0 : morphProgress * 15 }} className="h-[460px] overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-aura">
          <HeroScene progress={morphProgress} reduced={reduced} />
        </motion.div>
      </section>

      <section id="field" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-3xl font-semibold">Whispering Field</h2>
          <p className="text-sm text-emerald-100/70">Generated birds drift into the field over time.</p>
        </div>
        <div className="h-[460px] overflow-hidden rounded-3xl border border-white/10 bg-black/30">
          <FieldScene birds={birds} reduced={reduced} />
        </div>
      </section>
    </main>
  );
}
