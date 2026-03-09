"use client"

import { Label, Pie, PieChart } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { ExpensesDataTypes } from "@/types/type"
import { useMemo } from "react"


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

export function ExpensesCategroyChart({ expensesData }: { expensesData: ExpensesDataTypes[] }) {
    const currentYear = new Date().getFullYear();

    //データをカテゴリごとに集計するロジック
    const chartData = useMemo(() => {
        const categoryTotals: Record<string, number> = {};

        expensesData.forEach((expense) => {
            const targetDate = expense.event?.date ? new Date(expense.event.date) : new Date(expense.date);

            if (targetDate.getFullYear() === currentYear) {
                const category = expense.category || 'OTHER';
                categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount;
            }
        });

        //グラフが表示できる形に変換
        return Object.entries(categoryTotals).map(([category, amount]) => ({
            category,
            amount,
            fill: chartConfig[category as keyof typeof chartConfig]?.color || "hsl(var(--muted))",
        })).sort((a, b) => b.amount - a.amount)
    }, [expensesData, currentYear]);
    
    //本年度の合計金額計算
    const totalAmount = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.amount, 0)
    },[chartData]);

    return (
        <div className="mx-auto w-full h-[180px] flex-Start flex-col p-2">
            <div className="font-semibold w-full p-2">年間出費割合</div>
            <ChartContainer
                config={chartConfig}
                className="aspect-square h-full w-full "
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
        </div>
    )
}
