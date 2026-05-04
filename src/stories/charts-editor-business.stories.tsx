import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { VerticalBarChart as DiscountBarChart } from "src/ui/bar-chart";
import { CourseDiscountCodeInput } from "src/ui/CourseDiscountCodeInput";
import { DiscountCodeInput } from "src/ui/DiscountCodeInput";
import { MultiLingualSupportInputs } from "src/ui/MultiLingualInputs";
import TipTapEditor from "src/ui/TiptapEditor";
import { TipTapToolbar } from "src/ui/TipTapToolbar";
import { VerticalBarChart } from "src/ui/vertical-bar-chart";
import {
  configureBxUiHttpClient,
} from "src/utility/axiosInstance";
import { configureBxUiTextEditorAssetUploader } from "src/utility/textEditorAssetUtils";
import {
  configureBxUiStaticData,
} from "src/zustandStore/StaticDataStore";
import { ParticipantStore } from "src/zustandStore/ParticipantStore";

const meta: Meta = {
  title: "Common Components/Charts Editor And Business",
};

export default meta;

type Story = StoryObj;

const chartData = [
  { name: "Regular", total: 250, minimumAmount: 200 },
  { name: "Student", total: 150, minimumAmount: 120 },
  { name: "Senior", total: 100, minimumAmount: 80 },
];

const chartConfig = {
  total: {
    label: "Fee",
    color: "#7677F4",
  },
  minimumAmount: {
    label: "Discounted fee",
    color: "#D5D5FC",
  },
};

const discountChartData = [
  { name: "Regular", afterDiscount: 200, discountPart: 50, total: 250 },
  { name: "Student", afterDiscount: 120, discountPart: 30, total: 150 },
];

const discountChartConfig = {
  afterDiscount: {
    label: "After discount",
    color: "#7677F4",
  },
  discountPart: {
    label: "Discount",
    color: "#D5D5FC",
  },
};

const configureBusinessMocks = () => {
  configureBxUiStaticData({
    staticData: {
      countryConfigData: {
        decimal_delimiter: ".",
        thousands_separator: ",",
        fee_type: "DEFAULT",
      },
      tenantData: {},
      enumData: {},
    },
    newStaticData: {
      tenantConfig: {
        decimalDelimiter: ".",
        thousandsSeparator: ",",
        defaultCurrencyCode: "USD",
        localizationAvailableLanguages: [
          { code: "en", language: "English" },
          { code: "fr", language: "French" },
        ],
      },
    },
  });
  configureBxUiHttpClient({
    post: () => ({
      ok: true,
      json: async <R,>() => ({
        data: {
          status: "success",
          discountedAmount: 40,
        },
      }) as R,
    }),
  });
  configureBxUiTextEditorAssetUploader(async () => ({
    publicDownloadUrl: "https://placehold.co/320x160",
  }));
  ParticipantStore.getState().SetIsDiscountCodeApplied("open");
};

const DiscountInputExample = ({
  type = "manual",
}: {
  type?: "manual" | "course";
}) => {
  const form = useForm({
    defaultValues: {
      program_data: {
        id: 1,
        org_product: {
          is_reduced_fee_enabled: true,
        },
      },
      fee_level_id: 10,
      fee_level_obj: {
        fee_level: "regular",
        org_product_fee_level_config_id: 10,
      },
      org_product_fee_level_config: [
        {
          id: 10,
          max_discount_percentage: 20,
        },
      ],
      contact_obj: {
        email: "participant@example.com",
        user_preference: {
          communication_preferences: {
            preferred_language: {
              code: "en",
            },
          },
        },
      },
      registration_date: new Date().toISOString(),
      course_fee: 250,
      discounted_amount: 40,
    },
  });
  const [value, setValue] = useState("SAVE20");

  useEffect(() => {
    configureBusinessMocks();
  }, []);

  const Component =
    type === "course" ? CourseDiscountCodeInput : DiscountCodeInput;

  return (
    <FormProvider {...form}>
      <div className="w-[460px] rounded-lg border bg-white p-5">
        <Component
          value={value}
          onChange={setValue}
          getData={() => {}}
        />
      </div>
    </FormProvider>
  );
};

export const Charts: Story = {
  render: () => (
    <div className="grid w-[820px] gap-6">
      <VerticalBarChart
        data={chartData}
        chartConfig={chartConfig}
        title="Course Fees"
        defaultCurrencyCode="USD"
      />
      <DiscountBarChart
        data={discountChartData}
        chartConfig={discountChartConfig}
      />
    </div>
  ),
};

export const RichTextEditor: Story = {
  render: () => {
    const [content, setContent] = useState(
      "<p><strong>Welcome</strong> to the course description editor.</p>"
    );

    useEffect(() => {
      configureBusinessMocks();
    }, []);

    return (
      <div className="w-[760px]">
        <TipTapEditor
          content={content}
          onChange={setContent}
          characterLimit={500}
        />
        <div className="mt-3 rounded border bg-white p-3 text-xs">
          TipTapToolbar is rendered inside TipTapEditor; toolbar button exports
          are exercised by the editable toolbar.
        </div>
      </div>
    );
  },
};

export const MultiLingualInputs: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const [temporaryValue, setTemporaryValue] = useState<Record<string, string>>({
      en: "Happiness Program",
      fr: "Programme de bonheur",
    });

    return (
      <MultiLingualSupportInputs
        open={open}
        setOpen={setOpen}
        title="Course name"
        temporaryValue={temporaryValue}
        handleSave={() => setOpen(false)}
        handleInputChange={(languageCode, value) =>
          setTemporaryValue((current) => ({
            ...current,
            [languageCode]: value,
          }))
        }
        localizationAvailableLanguages={[
          { code: "en", language: "English" },
          { code: "fr", language: "French" },
        ]}
        name="storybook"
      />
    );
  },
};

export const DiscountCodeInputs: Story = {
  render: () => (
    <div className="space-y-5">
      <DiscountInputExample />
      <DiscountInputExample type="course" />
    </div>
  ),
};

export const TipTapToolbarReference: Story = {
  render: () => (
    <div className="rounded-lg border bg-white p-4 text-sm">
      <p>
        <code>TipTapToolbar</code> requires a live TipTap editor instance, so it
        is shown through the editable <code>TipTapEditor</code> story.
      </p>
    </div>
  ),
};
