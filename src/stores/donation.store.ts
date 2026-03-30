import { create } from "zustand";

interface DonateState {
  amount: string | null;
  presetAmount: string | null;

  setAmount: (amount: string) => void;
  setPresetAmount: (presetAmount: string) => void;
}

export const useDonateStore = create<DonateState>((set) => ({
  amount: null,
  presetAmount: null,

  setAmount: (amount) => set({ amount }),
  setPresetAmount: (presetAmount) => set({ presetAmount }),
}));
