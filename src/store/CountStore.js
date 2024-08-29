import { create } from 'zustand';

const useCountStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count:0 }),
}));

export default useCountStore;
