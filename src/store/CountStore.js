import { create } from 'zustand';
import config from '../config';

const useCountStore = create((set) => ({
  count: 0,
  curEmoji: 0,
  emojiArray: [],
  emojiCount: config.emojiCount,
  increment: () =>
    set((state) => {
      const newcurEmoji = Math.floor(Math.random() * state.emojiCount);
      return {
        count: state.count + 1,
        curEmoji: newcurEmoji,
        emojiArray: [...state.emojiArray, newcurEmoji],
      };
    }),
  reset: () => set({ count: 0, curEmoji: 0, emojiArray: [] }),
  setEmojiCount: (count) => set({ emojiCount: count }),
}));

export default useCountStore;
