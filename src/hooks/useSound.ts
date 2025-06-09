import { useCallback, useRef } from 'react';

type SoundType = 'click' | 'win' | 'lose';

const soundMap: Record<SoundType, string> = {
  click: '/sounds/click.mp3',
  win: '/sounds/win.mp3',
  lose: '/sounds/lose.mp3',
};

export const useSound = () => {
  const audioCache = useRef<Map<SoundType, HTMLAudioElement>>(new Map());

  const playSound = useCallback((type: SoundType) => {
    if (!soundMap[type]) return;

    // Load and cache audio
    if (!audioCache.current.has(type)) {
      const audio = new Audio(soundMap[type]);
      audio.volume = 0.5; // optional: adjust volume
      audioCache.current.set(type, audio);
    }

    const audio = audioCache.current.get(type)!;

    // Restart from beginning if already playing
    audio.currentTime = 0;
    audio.play().catch((err) => {
      console.error(`Error playing sound "${type}":`, err);
    });
  }, []);

  return { playSound };
};
