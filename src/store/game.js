import { create } from 'zustand';
import config from '../config';

const useGameStore = create((set) => ({
  level: 1,
  isFlipping: false,
  flipLimit: config.flipLimit,
  emojiCount: config.emojiCount,
  flipCount: 0,
  curEmoji: 0,
  emojiArray: [],
  increment: () =>
    set((state) => {
      const newcurEmoji = Math.floor(Math.random() * state.emojiCount);
      return {
        flipCount: state.flipCount + 1,
        curEmoji: newcurEmoji,
        emojiArray: [...state.emojiArray, newcurEmoji],
      };
    }),
  reset: () => set({ curEmoji: 0, emojiArray: [], flipCount: 0 }),
  setEmojiCount: (count) => set({ emojiCount: count }),
  setLevel: (level) => set({ level: level }),
  levelUp: () => set((state) => ({ level: state.level + 1, emojiCount: state.emojiCount + 1 })),
  setIsFlipping: (isFlipping) => set({ isFlipping: isFlipping }),
  setFlipLimit: (limit) => set({ flipLimit: limit }),
}));

export default useGameStore;
