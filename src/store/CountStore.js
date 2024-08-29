import { create } from 'zustand';
import config from '../config';

const useCountStore = create((set) => ({
  count: 0,
  randEmoji: 0,
  emojiArray: [],
  increment: () =>
    set((state) => {
      const newRandEmoji = Math.floor(Math.random() * config.emojiCount);
      return {
        count: state.count + 1,
        randEmoji: newRandEmoji,
        emojiArray: [...state.emojiArray, newRandEmoji],
      };
    }),
  reset: () => set({ count: 0, randEmoji: 0, emojiArray: [] }),
}));

export default useCountStore;
