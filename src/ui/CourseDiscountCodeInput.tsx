import {
  useGetDepositUtils,
  useGetShouldShowDeposit,
} from "@components/participants/ParticipantBusinessLogic";
import DiscountErrorMessage from "@public/icons/DiscountErrorMessage";
import DiscountSuccessGreenTick from "@public/icons/DiscountSuccessGreenTick";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ManualRegistrationFormNames } from "src/constants/ManualRegistrationConstants";
import { useCommonComponentStrings } from "src/i18n/useCommonComponentStrings";
import { pfNestInstance } from "src/utility/axiosInstance";
import { formatAmount } from "src/utility/CurrencyFormat";
import { useFeeTypeCheck } from "src/utility/isCentralFlow";
import { newOptionLabelValueStore } from "src/zustandStore/OptionLabelValueStore";
import { ParticipantStore } from "src/zustandStore/ParticipantStore";
import { staticDataStore } from "src/zustandStore/StaticDataStore";
import { Button } from "./button";
import { Input } from "./input";
export function CourseDiscountCodeInput({
  value,
  onChange,
  getData,
  error,
}: Readonly<{
  value: string;
  onChange: (val: string) => void;
  getData: (val: string | object) => void;
  error?: any;
}>) {
  const t = useCommonComponentStrings();
  const { optionLabelValue } = newOptionLabelValueStore();
  const { isDiscountCodeApplied } = ParticipantStore();
  const { watch, clearErrors, setValue } = useFormContext();
  const manualRegFormData = watch();

  const { newStaticData } = staticDataStore();
  const { shouldShowDeposit } = useGetShouldShowDeposit();
  const { getDepositFeeDetails } = useGetDepositUtils();
  const tenantConfig = newStaticData?.tenantConfig;
  const [isLoading, setIsLoading] = useState(false);
  const { isModelFeeType } = useFeeTypeCheck();
  const isModelFee = isModelFeeType();

  const handleClickApply = async () => {
    setIsLoading(true);
    console.log("hihii sushma", value, manualRegFormData);

    try {
      // Validate required fields
      if (
        !value ||
        !manualRegFormData?.program_data?.id ||
        !manualRegFormData?.fee_level_id ||
        !manualRegFormData?.registration_date
      ) {
        console.log(
          "Missing required fields for discount code validation sushma"
        );
        setIsLoading(false);
        return;
      }

      const now = new Date();
      const registrationDate = new Date(manualRegFormData?.registration_date);
      registrationDate?.setHours(
        now?.getHours(),
        now?.getMinutes(),
        now?.getSeconds(),
        now?.getMilliseconds()
      );

      const discountCodeBody: Record<string, unknown> = {
        email: manualRegFormData?.contact_obj?.email,
        programFeeLevelId: Number(manualRegFormData?.fee_level_id),
        discountCode: value,
        selectedLanguageCode:
          manualRegFormData?.contact_obj?.user_preference
            ?.communication_preferences?.preferred_language?.code ?? "en",
        registrationDate: dayjs(registrationDate).toISOString(),
      };

      if (manualRegFormData?.accommodation_type_obj?.id) {
        discountCodeBody.programAccommodationId = Number(
          manualRegFormData?.accommodation_type_obj?.id
        );
      }

      const response = await pfNestInstance.post(
        `pf/courses/${manualRegFormData?.program_data?.id}/participants/apply-discount`,
        {
          json: discountCodeBody,
        }
      );

      if (!response.ok) {
        const errorBody = await response.json<{
          message?: string | string[];
          error?: string;
        }>();
        const errorMessage = Array.isArray(errorBody?.message)
          ? errorBody.message.join(", ")
          : errorBody?.message ||
            errorBody?.error ||
            t("discountCode.validationError");

        getData({ errorMessage });
        return;
      }

      const discountCodeResponse = await response.json<object>();

      // Set the discount code data to callback function
      if (discountCodeResponse) {
        getData(discountCodeResponse);
      }
    } catch (err) {
      console.error(t("discountCode.validationConsoleError"), err);
      getData({
        errorMessage: t("discountCode.validationError"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickRemove = () => {
    onChange("");
    getData("");
    clearErrors([ManualRegistrationFormNames?.deposit_option]);
  };

  // Triggers the removal of the discount when the discount code application status changes to "open".
  // Use Case: Accommodation fee doesn't revert to original price after discount code removal.
  useEffect(() => {
    if (isDiscountCodeApplied === "open") {
      handleClickRemove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDiscountCodeApplied]);

  useEffect(() => {
    const { depositFeeLevelMatchingItem, depositTotal } =
      getDepositFeeDetails();

    const showDeposit = shouldShowDeposit(manualRegFormData);
    const isDepositOnlyPaymentType =
      depositFeeLevelMatchingItem?.is_payment_type_deposit_only === true;
    const isOptionalDepositEnabled =
      depositFeeLevelMatchingItem?.is_deposits_enabled === true ||
      depositFeeLevelMatchingItem?.is_deposit_enabled === true;

    setValue(ManualRegistrationFormNames?.deposit_option, "");
    setValue(ManualRegistrationFormNames?.fee_level_is_deposit_enabled, false);
    setValue(
      ManualRegistrationFormNames?.fee_level_payment_type_deposit_only,
      false
    );

    if (showDeposit) {
      if (isDepositOnlyPaymentType) {
        const depositPayAmount = Math.min(
          manualRegFormData?.course_fee,
          depositTotal
        );

        const isExpenseFeeOnline =
          manualRegFormData?.program_data?.expense_amount &&
          manualRegFormData?.program_data?.expense_fee_payment_mode ===
            optionLabelValue?.paymentMode?.ONLINE;

        const expenseFee = isExpenseFeeOnline
          ? (manualRegFormData?.expense_fee ?? 0)
          : 0;

        // Determine if accommodation fee is online
        const isAccommodationFeeOnline =
          manualRegFormData?.accommodation_fee &&
          manualRegFormData?.program_data?.accommodation_fee_payment_mode ===
            optionLabelValue?.paymentMode?.ONLINE;

        const accommodationFee = isAccommodationFeeOnline
          ? Number(manualRegFormData?.accommodation_fee ?? 0)
          : 0;

        // Course fee and deposit
        const effectiveCourseFee = manualRegFormData?.course_fee ?? 0;
        const effectiveDepositPayAmount = depositPayAmount ?? 0;

        // Final balance calculation
        const remainingBalanceAmount = isExpenseFeeOnline
          ? expenseFee +
            accommodationFee +
            effectiveCourseFee -
            effectiveDepositPayAmount
          : effectiveCourseFee + accommodationFee - effectiveDepositPayAmount;

        setValue(
          ManualRegistrationFormNames?.fee_level_payment_type_deposit_only,
          !!depositFeeLevelMatchingItem?.is_payment_type_deposit_only
        );

        setValue(
          ManualRegistrationFormNames?.deposit_pay_amount,
          depositPayAmount
        );

        setValue(
          ManualRegistrationFormNames?.remaining_amount_to_be_pay,
          remainingBalanceAmount
        );

        if (depositFeeLevelMatchingItem) {
          setValue(
            ManualRegistrationFormNames?.deposit_option,
            optionLabelValue?.participantDepositType?.DEPOSIT
          );
        }
      } else if (isOptionalDepositEnabled) {
        setValue(
          ManualRegistrationFormNames?.fee_level_is_deposit_enabled,
          !!depositFeeLevelMatchingItem
        );
        setValue(
          ManualRegistrationFormNames?.fee_level_payment_type_deposit_only,
          false
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    manualRegFormData?.course_fee,
    manualRegFormData?.expense_fee,
    manualRegFormData?.accommodation_fee,
  ]);

  const feeLevelObj = manualRegFormData.fee_level_obj;
  const feeLevelConfigs = manualRegFormData.org_product_fee_level_config;

  const matchedConfig = feeLevelConfigs?.find(
    (config: { id: number }) =>
      config.id === feeLevelObj.org_product_fee_level_config_id
  );

  const maxDiscountPercentage = matchedConfig?.max_discount_percentage ?? 0;
  const isReducedFeeEnabled =
    manualRegFormData?.program_data?.org_product?.is_reduced_fee_enabled;

  let discountMessage = "";

  const formattedAmount = formatAmount(
    manualRegFormData?.discounted_amount,
    tenantConfig?.thousandsSeparator ?? undefined,
    tenantConfig?.decimalDelimiter ?? undefined
  );

  if (isModelFee) {
    if (isReducedFeeEnabled) {
      discountMessage = `${t("discountCode.saveMoney")} ${
        tenantConfig?.defaultCurrencyCode
      } ${formattedAmount}, ${t("discountCode.maximumDiscountAllowedIs")} ${maxDiscountPercentage}%`;
    } else {
      discountMessage = t("discountCode.reducedFeeNotApplicable");
    }
  } else {
    discountMessage = `${t("discountCode.saveMoney")} ${
      tenantConfig?.defaultCurrencyCode
    } ${formattedAmount}`;
  }

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[white]/50 opacity-100">
          <div className="loader"></div>
        </div>
      )}
      <div
        className={`flex h-10 w-full items-center rounded-xl border ${error ? "border-[#FF6D6D]" : "border-[#E1E1E1]"} `}
      >
        <Input
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          className="m-1 h-9 rounded-xl border-none bg-white focus:outline-none"
          disabled={isDiscountCodeApplied !== "open"}
        />
        {isDiscountCodeApplied == "open" && (
          <Button
            variant={"plain"}
            onClick={() => {
              handleClickApply();
            }}
            className="!pr-3 text-sm font-medium leading-[18px] text-[#7677F4]"
            type="button"
            disabled={!(value && !error)}
          >
            {t("discountCode.apply")}
          </Button>
        )}
        {(isDiscountCodeApplied === "success" ||
          isDiscountCodeApplied === "error") && (
          <div className="flex items-center gap-2">
            {isDiscountCodeApplied === "success" ? (
              <DiscountSuccessGreenTick />
            ) : (
              <DiscountErrorMessage />
            )}
            <Button
              variant={"plain"}
              onClick={() => {
                handleClickRemove();
              }}
              className="!pr-3 text-sm font-medium leading-[18px] text-[#7677F4]"
              type="button"
            >
              {t("discountCode.remove")}
            </Button>
          </div>
        )}
      </div>
      {isDiscountCodeApplied == "success" ? (
        <div className="py-2 text-xs text-[#44B741]">{discountMessage}</div>
      ) : (
        ""
      )}
    </div>
  );
}
