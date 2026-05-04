type DepositDetails = {
  depositFeeLevelMatchingItem?: Record<string, any>;
  depositTotal?: number;
};

type DepositAdapter = {
  shouldShowDeposit?: (formData: any) => boolean;
  getDepositFeeDetails?: () => DepositDetails;
};

let adapter: DepositAdapter = {};

export const configureBxUiDepositAdapter = (nextAdapter: DepositAdapter) => {
  adapter = nextAdapter ?? {};
};

export const useGetShouldShowDeposit = () => ({
  shouldShowDeposit: (formData: any) => adapter.shouldShowDeposit?.(formData) ?? false
});

export const useGetDepositUtils = () => ({
  getDepositFeeDetails: () => adapter.getDepositFeeDetails?.() ?? {}
});
