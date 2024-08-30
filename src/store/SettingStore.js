import { create } from 'zustand';
import config from '../config';

const useSettingStore = create((set) => ({
  level: 1,
  isFlipping: false,
  flipLimit: config.flipLimit,
  emojiCount: config.emojiCount,
  setLevel: (level) => set({ level: level }),
  setIsFlipping: (isFlipping) =>
    set(() => {
      if (isFlipping === false) {
        return { isFlipping: isFlipping, flipLimit: 1 };
      }
      return { isFlipping: isFlipping };
    }),
  setFlipLimit: (limit) => set({ flipLimit: limit }),
  setEmojiCount: (count) => set({ emojiCount: count }),
}));

export default useSettingStore;
