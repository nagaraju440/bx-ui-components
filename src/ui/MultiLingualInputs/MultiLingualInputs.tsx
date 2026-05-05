import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { useCommonComponentStrings } from "src/i18n/useCommonComponentStrings";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";
import { Input } from "../input";
import { Text } from "../text";

export type localizationLanguagesDataBaseType = {
  code?: string;
  language?: string;
};

// Multi lingual support inputs component dialog
export const MultiLingualSupportInputs = ({
  open,
  setOpen,
  title,
  handleSave,
  temporaryValue,
  handleInputChange,
  errors,
  disabled = false,
  isRequiredField = true,
  localizationAvailableLanguages = [],
  name,
}: {
  open: boolean; // boolean to open or close the dialog
  setOpen: (open: boolean) => void; // function to change whether to open or close the dialog
  title: string; // title of the dialog
  handleSave: () => void; // function to handle when the user click on save button by validating and closing the dialog
  temporaryValue: {
    [key: string]: string | undefined;
  }; // temporary value of the language inputs
  handleInputChange: (languageCode: string, val: string) => void; // function to handle when the user change the value of the language inputs
  errors?:
    | Merge<
        FieldError,
        FieldErrorsImpl<{
          [x: string]: string;
        }>
      >
    | undefined; // errors of the language inputs
  disabled?: boolean;
  isRequiredField?: boolean;
  localizationAvailableLanguages?: localizationLanguagesDataBaseType[]; // list of localization available languages at country level
  name?: string;
}) => {
  const t = useCommonComponentStrings();

  const languagesData = localizationAvailableLanguages;

  // function to handle when the user click on cancel button
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="h-auto w-[718px]"
          handleClickCloseButton={() => setOpen(false)}
          closeIcon={true}
          data-testid={`multi-lingual-inputs-dialog-${name}`}
        >
          <DialogHeader className="h-7">
            <DialogTitle
              className="text-xl"
              data-testid={`multi-lingual-inputs-dialog-title-${name}`}
            >
              {title}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription
            className="mt-6"
            data-testid={`multi-lingual-inputs-dialog-description-${name}`}
          >
            <div className="flex flex-wrap gap-x-[30px] gap-y-6">
              {languagesData?.map((item: localizationLanguagesDataBaseType) => (
                <div
                  className="flex min-h-20 min-w-80 flex-col gap-1"
                  key={item.code}
                >
                  <Text
                    className="flex h-4 flex-row items-center gap-1 text-xs"
                    data-testid={`multi-lingual-input-label-${item?.code}-${name}`}
                  >
                    {item?.language}{" "}
                    {isRequiredField && <Text className="text-primary">*</Text>}
                  </Text>
                  <Input
                    placeholder={`${t("common.enter")} ${title}`}
                    value={temporaryValue?.[item?.code || "en"]}
                    onChange={(e) => {
                      handleInputChange(item?.code as string, e.target.value);
                    }}
                    className="rounded-xl text-sm text-[#333333]"
                    error={
                      errors?.[item?.code as string] ||
                      (!temporaryValue[item?.code as string] && errors?.message)
                        ? true
                        : false
                    }
                    disabled={disabled}
                    data-testid={`multi-lingual-input-${item?.code}-${name}`}
                  />
                  {errors && (
                    <Text className="!w-80 break-all text-red" size={"12"}>
                      {errors?.[item?.code as string]?.message ||
                        (!temporaryValue[item?.code as string] &&
                          (errors?.message as unknown as string))}
                    </Text>
                  )}
                </div>
              ))}
            </div>

            <DialogFooter className="mt-5 flex gap-2">
              <Button
                onClick={handleCancel}
                variant={"secondary"}
                data-testid={`multi-lingual-inputs-cancel-button-${name}`}
              >
                {t("common.cancel")}
              </Button>
              {!disabled ? (
                <Button
                  onClick={handleSave}
                  variant={"primary"}
                  data-testid={`multi-lingual-inputs-save-button-${name}`}
                >
                  {t("common.save")}
                </Button>
              ) : (
                ""
              )}
            </DialogFooter>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};
