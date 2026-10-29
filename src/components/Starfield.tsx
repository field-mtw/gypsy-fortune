'use client';

import { Particles, ParticlesProvider, useParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

async function initParticles(engine: Engine): Promise<void> {
  await loadSlim(engine);
}

/**
 * Calm starfield + drifting aura dust. Library-driven animation only.
 * Rendered once behind everything.
 */
function StarfieldInner() {
  const { loaded } = useParticlesProvider();
  if (!loaded) return null;

  return (
    <Particles
      id="aura-starfield"
      className="pointer-events-none fixed inset-0 -z-10"
      options={{
        fullScreen: false,
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        particles: {
          number: { value: 130, density: { enable: true, width: 1920, height: 1080 } },
          color: {
            value: ['#ffffff', '#a78bfa', '#5eead4', '#f0a6c8'],
          },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0.15, max: 0.8 },
            animation: { enable: true, speed: 0.6, sync: false, mode: 'auto' },
          },
          size: {
            value: { min: 0.6, max: 2.6 },
            animation: { enable: true, speed: 1.2, sync: false, mode: 'auto' },
          },
          move: {
            enable: true,
            direction: 'top',
            speed: { min: 0.08, max: 0.5 },
            straight: false,
            outModes: { default: 'out' },
          },
          twinkle: {
            particles: { enable: true, frequency: 0.06, opacity: 1 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'bubble' },
            resize: { enable: true },
          },
          modes: {
            bubble: { distance: 120, size: 4, duration: 1.2, opacity: 0.9 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}

export default function Starfield() {
  return (
    <ParticlesProvider init={initParticles}>
      <StarfieldInner />
    </ParticlesProvider>
  );
}
