"use client"
import { Label, Pie, PieChart } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { useMemo } from "react"
import { CategorySummaryDataProps } from "@/types/type"


const chartData_test = [
    { browser: "TICKET", visitors: 275, fill: "var(--color-TICKET)" },
    { browser: "GOODS", visitors: 200, fill: "var(--color-GOODS)" },
    { browser: "TRANSPORTATION", visitors: 187, fill: "var(--color-TRANSPORTATION)" },
    { browser: "ACCOMMODATION", visitors: 173, fill: "var(--color-ACCOMMODATION)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
    //amount: {label: '金額'},
    TICKET: {
        label: "チケット代",
        color: "var(--chart-1)",
    },
    GOODS: {
        label: "グッズ代",
        color: "var(--chart-2)",
    },
    TRANSPORTATION: {
        label: "交通費",
        color: "var(--chart-3)",
    },
    ACCOMMODATION: {
        label: "宿泊費",
        color: "var(--chart-4)",
    },
    OTHER: {
        label: "その他",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export function ExpensesCategroyChart({ categorySummaryData }: { categorySummaryData: CategorySummaryDataProps[] }) {
    const currentYear = new Date().getFullYear();
    //バックエンドから計算済みのグラフ用データが渡される(カテゴリ別)
    const chartData = useMemo(() => {
        return categorySummaryData.map((item) => ({
            category: item.category,
            amount: item.amount,
            fill: chartConfig[item.category as keyof typeof chartConfig]?.color || "hsl(var(--muted))"
        }))
        .sort((a, b) => b.amount - a.amount);
    },[categorySummaryData]);
    //合計の総額
    const totalAmount = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.amount, 0)
    },[chartData])

    return (
        <div className="flex-Center flex-col p-2 w-full">
            <div className="font-semibold w-full p-2 ">年間出費割合</div>
            <div className="flex w-full mx-auto h-[220px] lg:h-[200px] gap-2">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-square h-full w-full  "
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="category"
                            innerRadius={50}
                            outerRadius={70}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-lg font-semibold"
                                                >
                                                    ￥{totalAmount}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground text-xs"
                                                >
                                                    年間合計
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
                 {/* カテゴリ別合計データ */}
                <div className="flex flex-col p-2 text-sm">
                    <div className="font-semibold">カテゴリ別</div>
                    {chartData.map((chart) => (
                        <div key={chart.category} className="flex flex-col font-extralight py-2">
                            <div>{chart.category}</div>
                            <div className="font-semibold">¥{chart.amount}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
