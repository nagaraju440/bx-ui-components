import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "./card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { getCommonComponentString } from "src/i18n/useCommonComponentStrings";

export const VerticalBarChart = ({
  data,
  chartConfig,
}: {
  data: any[];
  chartConfig: ChartConfig;
}) => {
  return (
    <Card className="shadow-none">
      <CardContent className="!p-0 !pr-2">
        <ChartContainer
          config={chartConfig}
          className="h-[220px] w-full" // 👈 explicit height
        >
          <BarChart
            data={data}
            layout="vertical" // 🔑 orientation change
            barCategoryGap={0} // 👈 reduce vertical spacing
          >
            <CartesianGrid horizontal={false} />

            {/* Value axis */}
            <XAxis
              type="number"
              domain={[0, "dataMax"]}
              axisLine={false}
              tickLine={false}
            />

            {/* Category axis */}
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
                  className="w-40"
                  formatter={tooltipValueFormatter(chartConfig)}
                  labelFormatter={tooltipLabelFormatter()}
                />
              }
            />

            <ChartLegend content={<ChartLegendContent />} />

            <Bar
              dataKey="afterDiscount"
              stackId="a"
              fill="#7677f4"
              barSize={20}
            />

            <Bar
              dataKey="discountPart"
              stackId="a"
              fill="#d5d5fc"
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
interface DiscountFeeTooltipItemProps {
  value: number;
  name: string;
  chartConfig: ChartConfig;
}
const DiscountFeeTooltipItem = ({
  value,
  name,
  chartConfig,
}: DiscountFeeTooltipItemProps) => {
  const config = chartConfig[name];

  return (
    <div className="flex w-full justify-between">
      <span>{config?.label ?? name}</span>
      <span className="font-mono">{value.toLocaleString()}</span>
    </div>
  );
};

const tooltipValueFormatter =
  (chartConfig: ChartConfig) => (value: ValueType, name: NameType) => {
    const config = chartConfig[name as keyof ChartConfig];

    return (
      <div className="flex w-full justify-between">
        <span>{config?.label ?? name}</span>
        <span className="font-mono">{value.toLocaleString()}</span>
      </div>
    );
  };
export const tooltipLabelFormatter =
  (options?: { showTotal?: boolean }) => (label: NameType, payload?: any[]) => {
    const total = payload?.[0]?.payload?.total;

    return (
      <div className="space-y-1">
        <div className="font-medium">{label}</div>

        {options?.showTotal !== false && typeof total === "number" && (
          <div className="mt-1 flex w-full justify-between border-t pt-1 font-semibold">
            <span>{getCommonComponentString("barChart.total")}</span>
            <span className="font-mono">{total.toLocaleString()}</span>
          </div>
        )}
      </div>
    );
  };
