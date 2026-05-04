import { create } from "zustand";

export type BxUiStaticData = Record<string, any>;

interface StaticDataState {
  staticData: BxUiStaticData;
  setStaticData: (data: BxUiStaticData) => void;
  newStaticData: BxUiStaticData;
  setNewStaticData: (data: BxUiStaticData) => void;
  accessibleOrganizationsData: any[] | null;
  setAccessibleOrganizationsData: (data: any[]) => void;
  newAccessibleOrganizationsData: any[] | null;
  setNewAccessibleOrganizationsData: (data: any[]) => void;
  staticDataLoading: boolean;
  setStaticDataLoading: (loading: boolean) => void;
}

const defaultStaticData = {
  countryConfigData: {
    decimal_delimiter: ".",
    thousands_separator: ",",
    fee_type: "DEFAULT"
  },
  tenantData: {},
  enumData: {}
};

export const staticDataStore = create<StaticDataState>((set) => ({
  staticData: defaultStaticData,
  setStaticData: (data) => set({ staticData: data ?? defaultStaticData }),
  newStaticData: {
    tenantConfig: {
      decimalDelimiter: ".",
      thousandsSeparator: ",",
      defaultCurrencyCode: ""
    }
  },
  setNewStaticData: (data) => set({ newStaticData: data ?? {} }),
  accessibleOrganizationsData: null,
  setAccessibleOrganizationsData: (data) => set({ accessibleOrganizationsData: data }),
  newAccessibleOrganizationsData: null,
  setNewAccessibleOrganizationsData: (data) => set({ newAccessibleOrganizationsData: data }),
  staticDataLoading: false,
  setStaticDataLoading: (loading) => set({ staticDataLoading: loading })
}));

export const configureBxUiStaticData = (data: {
  staticData?: BxUiStaticData;
  newStaticData?: BxUiStaticData;
}) => {
  const { setStaticData, setNewStaticData } = staticDataStore.getState();
  if (data.staticData) setStaticData(data.staticData);
  if (data.newStaticData) setNewStaticData(data.newStaticData);
};
