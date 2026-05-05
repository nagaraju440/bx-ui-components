import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardTitle } from "../card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../chart";

export type VerticalBarChartDataRow = {
  name: string;
  [key: string]: number | string;
};

/**
 * VerticalBarChart Props
 *
 * data:
 *  - Dataset passed from the parent component.
 *  - Each object represents one Y-axis category.
 *  - Example:
 *    [
 *      { name: "Regular", total: 250, minimumAmount: 250 },
 *      { name: "Student", total: 125, minimumAmount: 125 }
 *    ]
 *  - "name" → displayed as Y-axis category label
 *  - Other numeric fields (total, minimumAmount, etc.) → rendered as bars
 *
 * chartConfig:
 *  - Configuration object that defines bar labels and colors.
 *  - Keys must match numeric fields in `data`.
 *  - Example:
 *    {
 *      total: {
 *        label: "Fee",
 *        color: "#d5d5fc"
 *      },
 *      minimumAmount: {
 *        label: "Fee After Max Discount",
 *        color: "#5e5fc3"
 *      }
 *    }
 *  - Used by legend and bar rendering for consistency.
 *
 * title:
 *  - Title displayed at the top of the chart.
 *  - Typically passed from i18n (e.g., "Knowledge Fee").
 *
 * thousandSeparator:
 *  - Number formatting option for tooltip values.
 *  - Example: "." (European number format).
 *  - Comes from tenant configuration.
 *
 * decimalDelimiter:
 *  - Decimal separator used in tooltip formatting.
 *  - Example: "," (European number format).
 *  - Comes from tenant configuration.
 *
 * defaultCurrencyCode:
 *  - Currency code displayed in tooltips.
 *  - Example: "EUR".
 *  - Used when rendering monetary values.
 */
export const VerticalBarChart = ({
  data,
  chartConfig,
  title,
  thousandSeparator,
  decimalDelimiter,
  defaultCurrencyCode,
}: {
  data: VerticalBarChartDataRow[];
  chartConfig: ChartConfig;
  title?: string;
  thousandSeparator?: string;
  decimalDelimiter?: string;
  defaultCurrencyCode?: string;
}) => {
  /**
   * Example data:
   * { name: "Regular", total: 250, minimumAmount: 250 }
   * - "name" → category label shown on the Y-axis ("Regular", "Student")
   * - "total", "minimumAmount" → numeric values rendered as bars
   * Exclude "name" so only numeric fields are used for bar rendering.
   */
  const barKeys = Object.keys(data?.[0] || {}).filter((key) => key !== "name");

  return (
    <Card className="w-full shadow-none">
      <CardContent className="!p-0 !pr-2">
        <CardTitle className="flex justify-center text-lg">{title}</CardTitle>
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <BarChart
            data={data}
            layout="vertical"
            barCategoryGap={0}
            barGap={-14}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" axisLine={false} tickLine={false} />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  thousandSeparator={thousandSeparator}
                  decimalDelimiter={decimalDelimiter}
                  defaultCurrencyCode={defaultCurrencyCode}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />

            {barKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                barSize={14}
                fill={chartConfig?.[key]?.color}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
