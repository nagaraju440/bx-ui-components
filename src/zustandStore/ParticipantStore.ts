import { create } from "zustand";

type DiscountCodeStatus = "open" | "success" | "error";

interface ParticipantState {
  isEarlyBirdEnabled: boolean;
  SetIsEarlyBirdEnabled: (value: boolean) => void;
  isDiscountCodeApplied: DiscountCodeStatus;
  SetIsDiscountCodeApplied: (value: DiscountCodeStatus) => void;
}

export const ParticipantStore = create<ParticipantState>((set) => ({
  isEarlyBirdEnabled: false,
  SetIsEarlyBirdEnabled: (value) => set({ isEarlyBirdEnabled: value }),
  isDiscountCodeApplied: "open",
  SetIsDiscountCodeApplied: (value) => set({ isDiscountCodeApplied: value })
}));
