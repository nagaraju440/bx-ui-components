import { create } from "zustand";

export enum FeeType {
  DEFAULT = "DEFAULT",
  MODEL = "MODEL"
}

export type Enums = Record<string, any>;
export type NewEnums = Record<string, any>;

const defaultEnums = {
  paymentMode: {
    ONLINE: "ONLINE",
    OFFLINE: "OFFLINE"
  },
  participantDepositType: {
    DEPOSIT: "DEPOSIT",
    FULL_AMOUNT: "FULL_AMOUNT"
  },
  fee_type: FeeType,
  feeType: FeeType
};

interface OptionLabelValueStore<T extends Record<string, any>> {
  optionLabelValue?: T;
  setOptionLabelValue: (data: T) => void;
}

export const optionLabelValueStore = create<OptionLabelValueStore<Enums>>((set) => ({
  optionLabelValue: defaultEnums,
  setOptionLabelValue: (data) => set({ optionLabelValue: data ?? defaultEnums })
}));

export const newOptionLabelValueStore = create<OptionLabelValueStore<NewEnums>>((set) => ({
  optionLabelValue: defaultEnums,
  setOptionLabelValue: (data) => set({ optionLabelValue: data ?? defaultEnums })
}));

export const configureBxUiOptionLabels = (data: Enums | NewEnums) => {
  optionLabelValueStore.getState().setOptionLabelValue(data);
  newOptionLabelValueStore.getState().setOptionLabelValue(data);
};
