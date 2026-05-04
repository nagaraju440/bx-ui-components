import { staticDataStore } from "src/zustandStore/StaticDataStore";
import { newOptionLabelValueStore } from "src/zustandStore/OptionLabelValueStore";

export const useCentralFlow = () => {
  const { staticData } = staticDataStore();
  return {
    isCentralFlow: () => staticData?.tenantData?.category === "GROUP_OF_COUNTRIES"
  };
};

export const isCentralFlow = () => {
  const { staticData } = staticDataStore.getState();
  return staticData?.tenantData?.category === "GROUP_OF_COUNTRIES";
};

export const useFeeTypeCheck = () => {
  const { staticData } = staticDataStore();
  const { optionLabelValue } = newOptionLabelValueStore();

  return {
    isModelFeeType: () =>
      staticData?.countryConfigData?.fee_type === optionLabelValue?.fee_type?.MODEL ||
      staticData?.countryConfigData?.fee_type === optionLabelValue?.feeType?.MODEL,
    isProgramFeeTypeModel: (feeType: string) =>
      feeType === optionLabelValue?.fee_type?.MODEL || feeType === optionLabelValue?.feeType?.MODEL
  };
};
